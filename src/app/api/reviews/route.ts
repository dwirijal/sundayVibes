import { NextResponse } from 'next/server'

// Placeholder for Google Places / Review API Integration
export async function GET() {
  try {
    // In production, you would query the Google Places API here using:
    // https://maps.googleapis.com/maps/api/place/details/json?place_id=YOUR_PLACE_ID&fields=reviews,rating,user_ratings_total&key=YOUR_API_KEY
    
    // For now, return mock data representative of Google Reviews
    const mockGoogleReviews = {
      rating: 4.9,
      user_ratings_total: 124,
      reviews: [
        {
          author_name: "Budi Santoso",
          rating: 5,
          text: "Sewa alat di sini gampang banget prosesnya. Kondisi alat sangat terawat dan CS responsif.",
          time: 1699999999
        },
        {
          author_name: "Siska Dewi",
          rating: 5,
          text: "Terbantu banget dengan tim web dev nya Sunday Vibes. Landing page kelar dalam 1 minggu, rapi dan kenceng.",
          time: 1699888888
        }
      ]
    }

    return NextResponse.json(mockGoogleReviews)
  } catch (error) {
    console.error('Google Reviews error:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}
