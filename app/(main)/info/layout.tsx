import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu & Thông tin kỳ thi",
  description: "Thông tin chi tiết về kỳ thi tốt nghiệp THPT 2027, thời gian dự kiến và nguồn tài nguyên.",
};

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
