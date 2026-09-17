"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Download, Smartphone, Share2, PlusSquare, Check } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .catch((error) => console.log("SW registration error:", error));
      });
    }

    // Check if already in standalone mode (installed as app)
    const isRunningStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isRunningStandalone) {
      setIsStandalone(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    if (isAppleDevice) {
      setIsIOS(true);
      setIsInstallable(true);
    }

    // Listen for beforeinstallprompt (Android / Chrome / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  // If already running as installed app, do not show install button
  if (isStandalone) {
    return null;
  }

  if (isInstalled) {
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled
        className="gap-1.5 text-xs text-muted-foreground"
      >
        <Check className="h-3.5 w-3.5 text-primary" />
        <span className="hidden sm:inline">Đã cài ứng dụng</span>
      </Button>
    );
  }

  if (!isInstallable) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleInstallClick}
        className="gap-1.5 text-xs h-8 px-2 sm:px-3 text-foreground hover:bg-muted"
        title="Tải ứng dụng về điện thoại"
      >
        <Download className="h-3.5 w-3.5 text-primary" />
        <span className="hidden sm:inline">Tải ứng dụng</span>
        <span className="sm:hidden">Cài app</span>
      </Button>

      {/* iOS Safari Installation Guide Modal */}
      <Dialog open={showIOSInstructions} onOpenChange={setShowIOSInstructions}>
        <DialogContent className="w-[92vw] max-w-sm p-4 sm:p-6">
          <DialogHeader className="space-y-1.5 text-left">
            <DialogTitle className="flex items-center gap-2 text-base">
              <Smartphone className="h-5 w-5 text-primary" />
              <span>Cài đặt ứng dụng trên iPhone / iPad</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Thực hiện 3 bước đơn giản trên trình duyệt Safari để thêm ứng dụng vào Màn hình chính:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs sm:text-sm text-foreground">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-secondary text-primary shrink-0 mt-0.5">
                <Share2 className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-foreground">Bước 1:</strong>
                <p className="text-xs text-muted-foreground">
                  Nhấn vào biểu tượng <strong>Chia sẻ (Share)</strong> ở thanh công cụ dưới cùng của Safari.
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-secondary text-primary shrink-0 mt-0.5">
                <PlusSquare className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-foreground">Bước 2:</strong>
                <p className="text-xs text-muted-foreground">
                  Cuộn xuống và chọn mục <strong>Thêm vào MH chính (Add to Home Screen)</strong>.
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-secondary text-primary shrink-0 mt-0.5">
                <Check className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-foreground">Bước 3:</strong>
                <p className="text-xs text-muted-foreground">
                  Nhấn <strong>Thêm (Add)</strong> ở góc trên bên phải để hoàn tất cài đặt ứng dụng.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
