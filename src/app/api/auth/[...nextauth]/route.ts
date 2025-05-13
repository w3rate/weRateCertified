import NextAuth, {NextAuthOptions, User as NextAuthUser, Account, Profile} from 'next-auth'
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
    async signIn({user, account, profile}: {user: NextAuthUser; account: Account | null; profile?: Profile}) {
      if (!db) {
        return true
      }
      try {
        let userRef
        const userData: {[key: string]: string | Date | null | undefined | boolean} = {
          name: user.name || null,
          email: user.email || null,
          image: user.image || null,
          provider: account?.provider,
          lastLogin: new Date()
        }

        if (account?.provider === 'google' && profile?.sub) {
          userRef = db.collection('users').doc(profile.sub)
          userData.providerAccountId = profile.sub
          if ((profile as {email_verified?: boolean})?.email_verified !== undefined) {
            userData.emailVerified = (profile as {email_verified: boolean}).email_verified
          }
        } else if (account?.provider === 'credentials' && user.id) {
          userRef = db.collection('users').doc(user.id)
          userData.providerAccountId = user.id
          userData.solanaPublicKey = user.id
        } else {
          return false
        }

        const docSnap = await userRef.get()
        if (!docSnap.exists) {
          userData.createdAt = new Date()
          await userRef.set(userData)
        } else {
          await userRef.update(userData)
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async jwt({token, user, account, profile}) {
      if (user) {
        token.provider = account?.provider
        if (account?.provider === 'google' && profile?.sub) {
          token.userId = profile.sub
        } else if (account?.provider === 'credentials' && user.id) {
          token.userId = user.id
          token.solanaPublicKey = user.id
        }
      }
      return token
    },
    async session({session, token}) {
      const sessionUser = session.user as {
        id?: string
        provider?: string
        solanaPublicKey?: string
        name?: string | null
        email?: string | null
        image?: string | null
      }

      if (token.userId) {
        sessionUser.id = token.userId as string
      }
      if (token.provider) {
        sessionUser.provider = token.provider as string
      }
      if (token.solanaPublicKey) {
        sessionUser.solanaPublicKey = token.solanaPublicKey as string
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
