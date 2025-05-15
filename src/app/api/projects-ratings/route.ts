import {NextResponse} from 'next/server'
import {initializeApp, getApps, cert} from 'firebase-admin/app'
import {getFirestore, type Firestore} from 'firebase-admin/firestore'

const projectIdEnv = process.env.FIREBASE_PROJECT_ID
const clientEmailEnv = process.env.FIREBASE_CLIENT_EMAIL
const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

if (!getApps().length) {
  if (projectIdEnv && clientEmailEnv && privateKeyEnv) {
    try {
      initializeApp({
        credential: cert({
          projectId: projectIdEnv,
          clientEmail: clientEmailEnv,
          privateKey: privateKeyEnv
        })
      })
    } catch (e: unknown) {
      console.error('API Route all-projects-ratings: Firebase Admin SDK Initialization Error during module load', e)
    }
  } else {
    console.error('API Route all-projects-ratings: Firebase Admin SDK credentials not fully set during module load.')
  }
}

type RatingsMap = Record<string, number | null>

export async function GET() {
  let db: Firestore

  if (!getApps().length) {
    return NextResponse.json({error: 'Firebase app not initialized on server. Cannot process request.'}, {status: 500})
  }

  try {
    db = getFirestore()
  } catch (e) {
    console.log(e)
    return NextResponse.json({error: 'Failed to get Firestore instance.'}, {status: 500})
  }

  try {
    const ratingsCollectionRef = db.collection('ratings')
    const snapshot = await ratingsCollectionRef.get()

    if (snapshot.empty) {
      return NextResponse.json({})
    }

    const ratingsMap: RatingsMap = {}
    snapshot.forEach((doc) => {
      const data = doc.data()
      if (data && typeof data.totalAverageRating === 'number') {
        ratingsMap[doc.id] = Math.round(data.totalAverageRating * 10) / 10
      } else {
        ratingsMap[doc.id] = 0
      }
    })

    return NextResponse.json(ratingsMap)
  } catch (error) {
    let errorMessage = 'An unknown server error occurred.'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    console.error('API Error fetching all project ratings:', error)
    return NextResponse.json(
      {error: 'Internal Server Error while fetching all ratings', details: errorMessage},
      {status: 500}
    )
  }
}
