import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

// Keep cache for 24 hours to avoid hitting Google Places API limits on Vercel Hobby
export const revalidate = 86400;

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    // If API keys are not provided (e.g. local dev), return mock data
    if (!apiKey || !placeId) {
      return NextResponse.json({
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
        ],
        source: "mock"
      });
    }

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}&language=id`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch from Google');
    }

    const data = await res.json();
    return NextResponse.json({ ...data.result, source: "live" });
  } catch (error) {
    logger.error('Google Reviews fetch failed', { error: String(error) });
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
