import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Deezer-ээс өгөгдөл татах (Timeout нэмэх боломжтой)
    const response = await fetch('https://api.deezer.com/playlist/15151333683/tracks', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      throw new Error(`Deezer API error: ${response.status}`);
    }

    const data = await response.json();

    // 2. Дата ирж байгаа эсэхийг шалгах
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error("Invalid data structure from Deezer:", data);
      return NextResponse.json({ error: 'No tracks found' }, { status: 404 });
    }

    // 3. Зөвхөн хэрэгцээт датаг шүүж авах
    const tracks = data.data
      .filter((track: any) => track.preview) // Preview URL байхгүй дууг алгасах
      .map((track: any) => ({
        id: track.id,
        title: track.title,
        preview: track.preview,
        artist_name: track.artist?.name || "Unknown Artist",
        album_cover: track.album?.cover_big || ""
      }));

    return NextResponse.json(tracks);

  } catch (error: any) {
    console.error('API Server Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
