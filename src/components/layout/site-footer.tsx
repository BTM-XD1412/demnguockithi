import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfoDialog } from "@/components/countdown/info-dialog";
import { Info, Github } from "lucide-react";
import { SITE_METADATA } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/70 backdrop-blur-none py-3 sm:py-4 mt-auto">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} - {SITE_METADATA.author}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1.5 h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <a
              href="https://github.com/BTM-XD1412/demnguockithi"
              target="_blank"
              rel="noopener noreferrer"
              title="Mã nguồn trên GitHub"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </Button>

          <InfoDialog>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Info className="h-3.5 w-3.5" />
              <span>Bản quyền & Nguồn</span>
            </Button>
          </InfoDialog>
        </div>
      </div>
    </footer>
  );
}
