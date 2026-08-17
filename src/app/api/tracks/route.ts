import type { Track } from "../../../types/track";

const DEEZER_PLAYLIST_URL = "https://api.deezer.com/playlist/15151333683/tracks";

function normalizeTrack(value: unknown): Track | null {
  if (!value || typeof value !== "object") return null;

  const source = value as Record<string, unknown>;
  if (
    typeof source.id !== "number" ||
    typeof source.title !== "string" ||
    typeof source.preview !== "string" ||
    source.preview.length === 0
  ) {
    return null;
  }

  const artist =
    source.artist && typeof source.artist === "object"
      ? (source.artist as Record<string, unknown>)
      : null;
  const album =
    source.album && typeof source.album === "object"
      ? (source.album as Record<string, unknown>)
      : null;

  return {
    id: source.id,
    title: source.title,
    preview: source.preview,
    artistName: typeof artist?.name === "string" ? artist.name : "Unknown artist",
    albumCover: typeof album?.cover_big === "string" ? album.cover_big : "",
  };
}

export async function GET() {
  try {
    const response = await fetch(DEEZER_PLAYLIST_URL, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Deezer API returned ${response.status}`);
    }

    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("data" in payload)) {
      throw new Error("Deezer API returned an unexpected response");
    }

    const rawTracks = (payload as { data: unknown }).data;
    if (!Array.isArray(rawTracks)) {
      throw new Error("Deezer API response does not contain a track list");
    }

    const tracks = rawTracks
      .map(normalizeTrack)
      .filter((track): track is Track => track !== null);

    if (tracks.length === 0) {
      return Response.json({ error: "Тоглох боломжтой дуу олдсонгүй." }, { status: 404 });
    }

    return Response.json(tracks);
  } catch (error) {
    console.error("Tracks API request failed:", error);
    return Response.json(
      { error: "Дууны жагсаалтыг одоогоор авч чадсангүй. Дараа дахин оролдоно уу." },
      { status: 502 },
    );
  }
}
