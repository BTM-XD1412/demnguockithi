"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Info, ExternalLink, Mail, ShieldAlert, Sparkles } from "lucide-react";
import { SITE_METADATA, EXAM_DATE_DISPLAY } from "@/lib/constants";

interface InfoDialogProps {
  children?: React.ReactNode;
}

export function InfoDialog({ children }: InfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Info className="h-4 w-4" />
            <span>Thông tin & Bản quyền</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[92vw] max-w-md max-h-[85vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Info className="h-4 sm:h-5 w-4 sm:w-5 text-primary shrink-0" />
            <span>Thông tin về trang web</span>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Thông tin chi tiết về nguồn tài nguyên, dự đoán kỳ thi và điều khoản sử dụng.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3.5 py-1 text-xs sm:text-sm text-muted-foreground">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <ShieldAlert className="h-4 w-4 text-primary shrink-0" />
              <span>Thời gian thi dự kiến</span>
            </div>
            <p className="text-xs leading-relaxed pl-6">
              Thời gian thi hiện tại chỉ là dự đoán (dự kiến ngày {EXAM_DATE_DISPLAY}), chưa có lịch thi chính thức từ Bộ Giáo dục & Đào tạo. Thông tin sẽ được cập nhật ngay khi có công bố chính thức.
            </p>
          </div>

          <Separator />

          <div className="space-y-1">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              <span>Nguồn câu châm ngôn</span>
            </div>
            <p className="text-xs leading-relaxed pl-6">
              Trang web tổng hợp các câu châm ngôn, danh ngôn tạo động lực học tập từ nhiều nguồn tác giả và tác phẩm kinh điển.
            </p>
          </div>

          <Separator />

          <div className="space-y-1">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>Báo lỗi & Bản quyền</span>
            </div>
            <p className="text-xs leading-relaxed pl-6">
              Mọi thắc mắc, đóng góp ý kiến hoặc phản hồi bản quyền xin gửi về:{" "}
              <a
                href={`mailto:${SITE_METADATA.authorEmail}`}
                className="text-foreground underline underline-offset-4 hover:text-primary transition-colors break-all"
              >
                {SITE_METADATA.authorEmail}
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
