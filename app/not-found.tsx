import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full border-border bg-card text-center p-6">
        <CardContent className="space-y-6 pt-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight font-mono">404</h1>
            <h2 className="text-lg font-semibold text-foreground">
              Không tìm thấy trang yêu cầu
            </h2>
            <p className="text-xs text-muted-foreground">
              Địa chỉ bạn truy cập có thể không tồn tại, đã bị thay đổi hoặc gỡ bỏ khỏi hệ thống.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <Button variant="default" asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                <span>Về trang chủ</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/info">
                <ArrowLeft className="h-4 w-4" />
                <span>Xem thông tin kỳ thi</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
