"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Headphones, Play, Music, Sparkles } from "lucide-react";

const DEFAULT_VIDEO_ID = "jfKfPfyJRdk"; // Lofi study stream

function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();

  // Direct video id (11 chars)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // watch?v=...
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // youtu.be/...
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // embed/...
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  return null;
}

const PRESET_TRACKS = [
  { name: "Lofi Study", id: "jfKfPfyJRdk" },
  { name: "Piano Thư Giãn", id: "4xDzrJKXOOY" },
  { name: "Tiếng Mưa & Sấm", id: "mPZkdNFkNps" },
  { name: "Study With Me", id: "1fueZCTYkpA" },
];

export function MusicPlayer() {
  const [inputUrl, setInputUrl] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState(DEFAULT_VIDEO_ID);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePlay = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputUrl.trim()) return;

    const id = extractYouTubeId(inputUrl);
    if (id) {
      setCurrentVideoId(id);
      setErrorMsg("");
      setInputUrl("");
    } else {
      setErrorMsg("Link YouTube không hợp lệ. Vui lòng thử lại.");
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  return (
    <Card className="w-full border-border bg-card/85 transition-colors flex flex-col justify-between">
      <div>
        <CardHeader className="p-4 sm:p-5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center text-indigo-500 dark:text-indigo-400 shrink-0">
              <Headphones className="h-4 w-4" />
            </div>
            <CardTitle className="text-base sm:text-lg font-bold text-foreground">
              Nghe Nhạc Thư Giãn
            </CardTitle>
          </div>
        </CardHeader>

        <div className="mx-4 sm:mx-5 border-b border-dashed border-border/80" />

        <CardContent className="p-4 sm:p-5 pt-3 space-y-3.5">
          {/* Ô nhập link YouTube */}
          <form onSubmit={handlePlay} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Dán link YouTube..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="rounded-full pl-4 pr-3 h-10 text-xs sm:text-sm bg-background/80 border-border/80 focus-visible:ring-indigo-500"
            />
            <Button
              type="submit"
              size="icon"
              title="Phát video này"
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
              src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=0&rel=0`}
              title="YouTube Relaxing Study Music"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {/* Danh sách gợi ý nhạc thư giãn */}
          <div className="pt-0.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              <span>Gợi ý âm thanh tập trung:</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {PRESET_TRACKS.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setCurrentVideoId(track.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                    currentVideoId === track.id
                      ? "bg-indigo-600/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/40"
                      : "border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <Music className="h-3 w-3" />
                  <span>{track.name}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
