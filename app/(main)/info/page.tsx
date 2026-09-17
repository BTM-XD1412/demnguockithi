import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackgroundBackdrop } from "@/components/countdown/background-backdrop";
import { ExamScheduleCard } from "@/components/countdown/exam-schedule-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  Info,
  CheckCircle2,
  Mail,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { EXAM_DATE_DISPLAY, EXAM_TITLE, SITE_METADATA } from "@/lib/constants";

export default function InfoPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <BackgroundBackdrop />
      <SiteHeader />

      <main className="flex-1 max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 w-full space-y-4 sm:space-y-6">
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 sm:gap-3">
          <Button variant="ghost" size="sm" asChild className="gap-2 text-xs h-8 px-2 sm:px-3">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại trang chủ</span>
            </Link>
          </Button>

          <Badge variant="outline" className="gap-1.5 text-xs py-1 px-2.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>Ngày thi: {EXAM_DATE_DISPLAY}</span>
          </Badge>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Thông tin {EXAM_TITLE}
          </h1>
          <p className="text-sm text-muted-foreground">
            Tổng hợp thông tin quan trọng, kế hoạch dự kiến và các lưu ý cần thiết cho sĩ tử 2009.
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="border-border bg-card/80">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Lưu ý về lịch thi chính thức</CardTitle>
              </div>
              <CardDescription>
                Tình trạng thông tin ngày thi hiện tại
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Thời gian hiển thị đếm ngược (<strong>{EXAM_DATE_DISPLAY}</strong>) hiện tại là mốc thời gian <strong>dự đoán</strong> theo quy luật tổ chức thi các năm gần đây của Bộ Giáo dục và Đào tạo.
              </p>
              <p>
                Khi có văn bản chỉ đạo và kế hoạch thời gian năm học chính thức từ Bộ GD&ĐT, thời gian trên hệ thống sẽ lập tức được cập nhật chuẩn xác theo từng giờ thi.
              </p>
            </CardContent>
          </Card>

          <ExamScheduleCard />

          <Card className="border-border bg-card/80">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Kế hoạch ôn tập khuyến nghị</CardTitle>
              </div>
              <CardDescription>
                Phân bổ thời gian ôn luyện hiệu quả theo từng giai đoạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Giai đoạn 1: Nắm vững kiến thức nền tảng</strong>
                  <p className="text-xs mt-0.5">Hệ thống hóa toàn bộ lý thuyết và các dạng bài tập trọng tâm trong chương trình GDPT 2018.</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Giai đoạn 2: Luyện đề và rèn kỹ năng phân bổ thời gian</strong>
                  <p className="text-xs mt-0.5">Thực hành giải đề thi thử, đề minh họa định dạng mới, rèn áp lực thời gian làm bài.</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Giai đoạn 3: Tổng ôn và ổn định tâm lý</strong>
                  <p className="text-xs mt-0.5">Rà soát lại các lỗi sai thường gặp, giữ gìn sức khỏe, đảm bảo tinh thần thoải mái tự tin.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/80">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Ghi nhận bản quyền và nguồn tham khảo</CardTitle>
              </div>
              <CardDescription>
                Minh bạch nguồn tài nguyên và thông tin liên hệ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                • <strong>Châm ngôn:</strong> Tuyển tập các câu nói truyền cảm hứng từ triết gia, nhà khoa học và danh nhân thế giới.
              </p>
              <p>
                • <strong>Phát triển & Liên hệ:</strong> {SITE_METADATA.author} (
                <a
                  href={`mailto:${SITE_METADATA.authorEmail}`}
                  className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
                >
                  {SITE_METADATA.authorEmail}
                </a>
                ).
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
