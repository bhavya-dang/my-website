import { google } from "googleapis";
import { NextResponse } from "next/server";
import { youtube_v3 } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export async function GET() {
  try {
    // Get channel uploads playlist ID
    const channelResponse = await youtube.channels.list({
      part: ["contentDetails"],
      id: [process.env.YOUTUBE_CHANNEL_ID!],
    });

    const uploadsPlaylistId =
      channelResponse.data.items?.[0]?.contentDetails?.relatedPlaylists
        ?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error("Could not find uploads playlist ID");
    }

    // Get latest videos from uploads playlist
    const playlistResponse = await youtube.playlistItems.list({
      part: ["snippet"],
      playlistId: uploadsPlaylistId,
      maxResults: 6,
    });

    const videoIds = playlistResponse.data.items
      ?.map((item) => item.snippet?.resourceId?.videoId)
      .filter((id): id is string => id !== null && id !== undefined);

    if (!videoIds?.length) {
      throw new Error("No videos found");
    }

    // Get video statistics
    const videosResponse = await youtube.videos.list({
      part: ["statistics", "snippet"],
      id: videoIds,
    });

    const videos = videosResponse.data.items?.map(
      (video: youtube_v3.Schema$Video) => ({
        id: video.id ?? "",
        title: video.snippet?.title ?? "",
        description: video.snippet?.description ?? "",
        thumbnail:
          video.snippet?.thumbnails?.maxres?.url ||
          video.snippet?.thumbnails?.high?.url ||
          video.snippet?.thumbnails?.default?.url ||
          "",
        publishedAt: video.snippet?.publishedAt ?? "",
        viewCount: video.statistics?.viewCount ?? "0",
      })
    );

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("YouTube API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube videos" },
      { status: 500 }
    );
  }
}
