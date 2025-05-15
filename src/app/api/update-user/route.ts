import {NextResponse} from 'next/server'
import {db} from '@/providers/firebase'

export async function POST(request: Request) {
  try {
    const {userId, updates} = await request.json()

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({success: false, error: 'Valid userId is required'}, {status: 400})
    }

    if (!updates || typeof updates !== 'object') {
      return NextResponse.json({success: false, error: 'Updates object is required'}, {status: 400})
    }

    await db
      .collection('users')
      .doc(userId)
      .update({
        ...updates,
        lastLogin: new Date().toISOString()
      })

    return NextResponse.json({
      success: true,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({success: false, error: 'Internal Server Error'}, {status: 500})
  }
}
