// app/api/project-details/[id]/route.ts
import {NextResponse, type NextRequest} from 'next/server'
import {initializeApp, getApps, cert} from 'firebase-admin/app'
import {getFirestore, type Firestore} from 'firebase-admin/firestore'

if (!getApps().length) {
  const projectIdEnv = process.env.FIREBASE_PROJECT_ID
  const clientEmailEnv = process.env.FIREBASE_CLIENT_EMAIL
  const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (projectIdEnv && clientEmailEnv && privateKeyEnv) {
    try {
      initializeApp({
        credential: cert({
          projectId: projectIdEnv,
          clientEmail: clientEmailEnv,
          privateKey: privateKeyEnv
        })
      })
      console.log('Firebase Admin SDK Initialized from project-details API route (module scope).')
    } catch (e) {
      console.error('API Route project-details: Firebase Admin SDK Initialization Error (module scope)', e)
    }
  } else {
    console.error('API Route project-details: Firebase Admin SDK credentials not fully set (module scope).')
  }
}

export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  let db: Firestore

  try {
    if (getApps().length > 0) {
      db = getFirestore()
    } else {
      console.error('API Error in project-details: Firebase app not initialized. Cannot get Firestore instance.')
      return NextResponse.json({success: false, error: 'Firebase not initialized on server'}, {status: 500})
    }

    const projectId = (await params).id

    if (!projectId || typeof projectId !== 'string') {
      return NextResponse.json(
        {success: false, error: 'Valid project ID (from URL segment [id]) is required'},
        {status: 400}
      )
    }

    const projectDocRef = db.collection('ratings').doc(projectId)
    const docSnap = await projectDocRef.get()

    if (!docSnap.exists) {
      return NextResponse.json({success: false, error: 'Project not found'}, {status: 404})
    }

    const projectData = docSnap.data()

    if (projectData && projectData.ratings && Array.isArray(projectData.ratings)) {
      projectData.ratings.sort((a, b) => {
        const dateA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0
        const dateB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0
        return dateB - dateA
      })
    }

    return NextResponse.json({success: true, data: projectData})
  } catch (error) {
    const idForLogging = (await params).id || 'unknown_id'
    console.error(`API Error fetching project-details for id ${idForLogging}:`, error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.'
    return NextResponse.json({success: false, error: 'Internal Server Error', details: errorMessage}, {status: 500})
  }
}
