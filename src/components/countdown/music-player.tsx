"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Headphones, Play, Music, ListMusic, Sparkles } from "lucide-react";

export interface MediaTarget {
  type: "video" | "playlist";
  id: string; // Video ID or Playlist ID
  videoId?: string; // Optional video ID when starting from a specific track in playlist
}

// Mặc định: Video "2-HOUR STUDY WITH ME / Lake Morning" (ThisWood)
const DEFAULT_MEDIA: MediaTarget = {
  type: "video",
  id: "KLujsdZY3xU",
};

export function parseYouTubeInput(input: string): MediaTarget | null {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();

  // 1. Link có tham số playlist: ?list=... hoặc &list=...
  const listMatch = trimmed.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  if (listMatch) {
    const listId = listMatch[1];
    const videoMatch = trimmed.match(
      /(?:v=|youtu\.be\/|embed\/|live\/)([a-zA-Z0-9_-]{11})/
    );
    return {
      type: "playlist",
      id: listId,
      videoId: videoMatch ? videoMatch[1] : undefined,
    };
  }

  // 2. Playlist ID trực tiếp (bắt đầu bằng PL, OLAK, RD, UU, FL...)
  if (/^(?:PL|OLAK5uy_|RD|UU|FL|LL)[a-zA-Z0-9_-]{10,}$/.test(trimmed)) {
    return { type: "playlist", id: trimmed };
  }

  // 3. Đường dẫn playlist dạng /playlist?list=...
  const pathMatch = trimmed.match(
    /youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)/
  );
  if (pathMatch) {
    return { type: "playlist", id: pathMatch[1] };
  }

  // 4. Video đơn thông thường (watch, youtu.be, embed, live)
  const watchMatch = trimmed.match(
    /(?:youtube\.com\/watch\?v=|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/
  );
  if (watchMatch) return { type: "video", id: watchMatch[1] };

  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return { type: "video", id: shortMatch[1] };

  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return { type: "video", id: embedMatch[1] };

  // 5. Video ID 11 ký tự trực tiếp
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return { type: "video", id: trimmed };
  }

  return null;
}

function getEmbedSrc(media: MediaTarget): string {
  if (media.type === "playlist") {
    if (media.videoId) {
      return `https://www.youtube-nocookie.com/embed/${media.videoId}?list=${media.id}&rel=0`;
    }
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${media.id}&rel=0`;
  }
  return `https://www.youtube-nocookie.com/embed/${media.id}?rel=0`;
}

const PRESET_TRACKS: {
  name: string;
  target: MediaTarget;
}[] = [
  {
    name: "Study With Me",
    target: { type: "video", id: "KLujsdZY3xU" },
  },
  {
    name: "Lofi Girl (Live 24/7)",
    target: { type: "video", id: "5qap5aO4i9A" },
  },
  {
    name: "Lofi Study (Playlist)",
    target: { type: "playlist", id: "PLofht4PTcKYnaH8w5olJCI-wUVxuoMHqM" },
  },
  {
    name: "1 A.M Study Session",
    target: { type: "video", id: "lTRiuFIWV54" },
  },
  {
    name: "Piano Thư Giãn",
    target: { type: "video", id: "4xDzrJKXOOY" },
  },
  {
    name: "Tiếng Mưa & Sấm",
    target: { type: "video", id: "mPZkdNFkNps" },
  },
];

export function MusicPlayer() {
  const [inputUrl, setInputUrl] = useState("");
  const [currentMedia, setCurrentMedia] = useState<MediaTarget>(DEFAULT_MEDIA);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePlay = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputUrl.trim()) return;

    const parsed = parseYouTubeInput(inputUrl);
    if (parsed) {
      setCurrentMedia(parsed);
      setErrorMsg("");
      setInputUrl("");
    } else {
      setErrorMsg(
        "Link video hoặc playlist YouTube không hợp lệ. Vui lòng kiểm tra lại."
      );
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  const isCurrentPreset = (target: MediaTarget) => {
    return (
      currentMedia.type === target.type &&
      currentMedia.id === target.id &&
      currentMedia.videoId === target.videoId
    );
  };

  return (
    <Card className="w-full border-border bg-card/85 transition-colors flex flex-col justify-between">
      <div>
        <CardHeader className="p-4 sm:p-5 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center text-indigo-500 dark:text-indigo-400 shrink-0">
                <Headphones className="h-4 w-4" />
              </div>
              <CardTitle className="text-base sm:text-lg font-bold text-foreground">
                Nghe Nhạc Thư Giãn
              </CardTitle>
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              {currentMedia.type === "playlist" ? (
                <>
                  <ListMusic className="h-3 w-3 text-indigo-500" />
                  <span>Playlist</span>
                </>
              ) : (
                <>
                  <Music className="h-3 w-3 text-indigo-500" />
                  <span>Video</span>
                </>
              )}
            </span>
          </div>
        </CardHeader>

        <div className="mx-4 sm:mx-5 border-b border-dashed border-border/80" />

        <CardContent className="p-4 sm:p-5 pt-3 space-y-3.5">
          {/* Ô nhập link YouTube video hoặc playlist */}
          <form onSubmit={handlePlay} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Dán link video hoặc playlist YouTube..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="rounded-full pl-4 pr-3 h-10 text-xs sm:text-sm bg-background/80 border-border/80 focus-visible:ring-indigo-500"
            />
            <Button
              type="submit"
              size="icon"
              title="Phát video hoặc playlist này"
              className="rounded-full h-10 w-10 bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 shadow-none"
            >
              <Play className="h-4 w-4 fill-current ml-0.5" />
              <span className="sr-only">Phát</span>
            </Button>
          </form>

          {errorMsg && (
            <p className="text-xs text-destructive font-medium pl-2">
              {errorMsg}
            </p>
          )}

          {/* Khung nhúng YouTube Player */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/70 bg-black/40">
            <iframe
              src={getEmbedSrc(currentMedia)}
              title="YouTube Relaxing Study Music"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {/* Danh sách gợi ý âm thanh tập trung */}
          <div className="pt-0.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              <span>Gợi ý âm thanh tập trung:</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {PRESET_TRACKS.map((track) => {
                const active = isCurrentPreset(track.target);
                return (
                  <button
                    key={track.name}
                    type="button"
                    onClick={() => setCurrentMedia(track.target)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      active
                        ? "bg-indigo-600/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/40"
                        : "border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    {track.target.type === "playlist" ? (
                      <ListMusic className="h-3 w-3" />
                    ) : (
                      <Music className="h-3 w-3" />
                    )}
                    <span>{track.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
