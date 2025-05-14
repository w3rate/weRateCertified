import {NextResponse} from 'next/server'
import {db, FieldValue} from '@/providers/firebase'

const RATING_CATEGORY_KEYS = ['team', 'codebase_security', 'usability_ux', 'community_social', 'moon_potential']

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {projectId, overallRating, usageDuration, detailedRatings, comment, selectedWallet} = body

    if (!projectId || (typeof projectId !== 'string' && typeof projectId !== 'number')) {
      return NextResponse.json({success: false, error: 'Valid projectId is required'}, {status: 400})
    }
    const projectIdString = String(projectId)

    if (typeof overallRating !== 'number' || overallRating < 0 || overallRating > 5) {
      return NextResponse.json({success: false, error: 'Valid overallRating (0-5) is required'}, {status: 400})
    }

    const newReview = {
      overallRating,
      usageDuration: usageDuration || '',
      detailedRatings: detailedRatings || {},
      comment: comment || '',
      selectedWallet: selectedWallet || '',
      submittedAt: new Date().toISOString()
    }

    const ratingDocRef = db.collection('ratings').doc(projectIdString)

    await db.runTransaction(async (transaction) => {
      const projectDoc = await transaction.get(ratingDocRef)
      const projectData = projectDoc.exists ? projectDoc.data() : {}

      let reviewCount = projectData?.reviewCount || 0
      let totalOverallRatingSum = projectData?.totalOverallRatingSum || 0
      const detailedRatingBreakdown = projectData?.detailedRatingBreakdown || {}

      RATING_CATEGORY_KEYS.forEach((key) => {
        if (!detailedRatingBreakdown[key]) {
          detailedRatingBreakdown[key] = {sum: 0, count: 0, average: 0.0}
        }
      })

      reviewCount += 1
      totalOverallRatingSum += newReview.overallRating
      const newTotalAverageRating = totalOverallRatingSum / reviewCount

      if (newReview.detailedRatings && typeof newReview.detailedRatings === 'object') {
        RATING_CATEGORY_KEYS.forEach((key) => {
          const score = newReview.detailedRatings[key]
          if (typeof score === 'number') {
            detailedRatingBreakdown[key].sum = (detailedRatingBreakdown[key].sum || 0) + score
            detailedRatingBreakdown[key].count = (detailedRatingBreakdown[key].count || 0) + 1
            if (detailedRatingBreakdown[key].count > 0) {
              detailedRatingBreakdown[key].average =
                detailedRatingBreakdown[key].sum / detailedRatingBreakdown[key].count
            } else {
              detailedRatingBreakdown[key].average = 0.0
            }
          }
        })
      }

      const updatePayload = {
        ratings: FieldValue.arrayUnion(newReview),
        reviewCount,
        totalOverallRatingSum,
        totalAverageRating: newTotalAverageRating,
        detailedRatingBreakdown
      }

      transaction.set(ratingDocRef, updatePayload, {merge: true})
    })

    return NextResponse.json({
      success: true,
      message: 'Review submitted and aggregates updated successfully',
      submittedTimestamp: newReview.submittedAt
    })
  } catch (error) {
    console.error('API Error in submit-review:', error)
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error'
    return NextResponse.json({success: false, error: 'Internal Server Error', details: errorMessage}, {status: 500})
  }
}
