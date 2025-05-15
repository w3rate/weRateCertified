import NextAuth, {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import {
  initializeApp,
  getApps,
  App as FirebaseApp,
  cert,
  ServiceAccount as FirebaseServiceAccount
} from 'firebase-admin/app'
import {getFirestore, Firestore} from 'firebase-admin/firestore'
import bs58 from 'bs58'
import nacl from 'tweetnacl'

interface IFirebaseAdminServiceAccount {
  projectId?: string
  clientEmail?: string
  privateKey?: string
}

const serviceAccount: IFirebaseAdminServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined
}

let firebaseAppInstance: FirebaseApp | undefined
if (!getApps().length) {
  if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
    firebaseAppInstance = initializeApp({
      credential: cert(serviceAccount as FirebaseServiceAccount)
    })
  }
} else {
  firebaseAppInstance = getApps()[0]
}

const db: Firestore | null = firebaseAppInstance ? getFirestore(firebaseAppInstance) : null

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'Solana',
      credentials: {
        message: {label: 'Message', type: 'text'},
        signature: {label: 'Signature (bs58 encoded)', type: 'text'},
        publicKey: {label: 'Public Key (bs58 encoded)', type: 'text'}
      },
      async authorize(credentials) {
        if (!credentials?.message || !credentials.signature || !credentials.publicKey) {
          return null
        }
        try {
          const messageBytes = new TextEncoder().encode(credentials.message)
          const signatureBytes = bs58.decode(credentials.signature)
          const publicKeyBytes = bs58.decode(credentials.publicKey)

          const isVerified = nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes)

          if (!isVerified) {
            return null
          }
          return {
            id: credentials.publicKey
          }
        } catch (e) {
          console.log(e)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn({user, account, profile}) {
      if (!db) {
        return true
      }
      try {
        let docId: string
        const providerDataToStore: {[key: string]: string | null | undefined | Date | boolean} = {
          name: user.name || null,
          email: user.email || null,
          image: user.image || null,
          provider: account?.provider,
          lastLogin: new Date()
        }

        if (account?.provider === 'google') {
          docId = profile?.email || ''
        } else if (account?.provider === 'credentials') {
          docId = user.id!
          providerDataToStore.solanaPublicKey = user.id
        } else {
          return false
        }

        const userRef = db.collection('users').doc(docId)
        const docSnap = await userRef.get()

        if (!docSnap.exists) {
          providerDataToStore.createdAt = new Date()
          providerDataToStore.onboarded = false
          if (account?.provider === 'google') {
            providerDataToStore.solanaPublicKey = null
          }
          await userRef.set(providerDataToStore)
        } else {
          await userRef.update(providerDataToStore)
        }
        return true
      } catch (error) {
        console.log('NextAuth signIn callback error:', error)
        return false
      }
    },

    async jwt({token, user, account, profile, trigger, session}) {
      if (user && account) {
        token.provider = account.provider
        if (account.provider === 'google') {
          token.sub = profile?.email || profile?.sub
          token.email = profile?.email || user?.email
          token.name = profile?.name || user?.name
          token.picture = profile?.image || user?.image
        } else if (account.provider === 'credentials') {
          token.sub = user.id
          token.solanaPublicKey = user.id
        }
      }

      if (db && token.sub) {
        try {
          const userDoc = await db
            .collection('users')
            .doc(token.sub as string)
            .get()
          if (userDoc.exists) {
            const dbData = userDoc.data()
            token.name = dbData?.name ?? token.name
            token.email = dbData?.email ?? token.email
            token.picture = dbData?.image ?? token.picture
            token.solanaPublicKey = dbData?.solanaPublicKey ?? token.solanaPublicKey
            token.onboarded = dbData?.onboarded == true
          }
        } catch (e) {
          console.error(e)
        }
      }

      if (trigger === 'update' && session?.user) {
        const updates = session.user as Record<string, string>
        if (typeof updates.name !== 'undefined') token.name = updates.name
        if (typeof updates.email !== 'undefined') token.email = updates.email
        if (typeof updates.image !== 'undefined') token.picture = updates.image
        if (typeof updates.provider !== 'undefined') token.provider = updates.provider
        if (typeof updates.providerAccountId !== 'undefined') token.providerAccountId = updates.providerAccountId
        if (typeof updates.solanaPublicKey !== 'undefined') token.solanaPublicKey = updates.solanaPublicKey
        if (typeof updates.createdAt !== 'undefined') token.createdAt = updates.createdAt
        if (typeof updates.lastLogin !== 'undefined') token.lastLogin = updates.lastLogin
        if (typeof updates.onboarded === 'boolean') token.onboarded = updates.onboarded
      }
      return token
    },

    async session({session: clientSession, token}) {
      const userSessionData: Record<string, string | null | boolean> = {}
      if (token.sub) userSessionData.id = token.sub
      userSessionData.name = token.name ?? null
      userSessionData.email = token.email ?? null
      userSessionData.image = token.picture ?? null
      if (token.provider) userSessionData.provider = token.provider
      userSessionData.solanaPublicKey = token.solanaPublicKey ?? null
      userSessionData.onboarded = token.onboarded == true

      clientSession.user = userSessionData
      return clientSession
    }
  }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
