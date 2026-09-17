# ⏳ Đếm Ngược Kỳ Thi Tốt Nghiệp THPT 2027

Ứng dụng web đếm ngược thời gian thực đến **Kỳ thi tốt nghiệp THPT 2027**, tích hợp thanh tiến trình năm học, lịch thi chi tiết, danh ngôn tạo động lực tự động xoay, đồng hồ Pomodoro và trình phát nhạc học tập thư giãn.

---

## 🌟 Tính Năng Nổi Bật

- ⏱️ **Đồng hồ đếm ngược thời gian thực**:
  - Chuẩn hóa theo múi giờ Việt Nam (**GMT+7**), chính xác từng giây.
  - Tự động đồng bộ với từng môn thi hoặc mốc bắt đầu ngày thi (`00:00 11/06/2027`).
- 📅 **Lịch thi tổng quan 2027 (Dự kiến)**:
  - Danh sách chi tiết các buổi thi: *Ngữ văn*, *Toán*, *Bài thi Tự chọn 1 & 2*.
  - Bấm chọn trực tiếp từng môn trên lịch để chuyển đối tượng đếm ngược trên bảng chính.
- 📊 **Thanh tiến trình năm học**:
  - Tự động tính toán tỷ lệ % thời gian đã trôi qua từ ngày khai giảng (`05/09/2026`) đến ngày thi THPT 2027.
- 🍅 **Đồng hồ Pomodoro tích hợp**:
  - Đồng hồ số lớn phong cách tối giản, hỗ trợ các cấu hình phổ biến: `25/5`, `50/10`, `15/3`, `45/15` hoặc tùy chỉnh số phút bất kỳ.
  - Chuông báo âm thanh nhẹ nhàng.
  - Tùy chọn tự động chuyển phiên nghỉ và bảng thống kê tổng số phiên / số phút đã học.
- 🎧 **Trình nghe nhạc thư giãn (YouTube Player)**:
  - Cho phép dán thẳng link Video hoặc **Playlist YouTube** bất kỳ (`youtube.com/playlist?list=...`).
  - Đi kèm các preset âm thanh tập trung chất lượng cao: *Study With Me*, *Lofi Study Playlist*, *Piano Thư Giãn*, *Tiếng Mưa & Sấm*.
- 🖼️ **Bộ sưu tập hình nền linh hoạt**:
  - Tùy chọn chuyển đổi hình nền phong cảnh, hỗ trợ lưu trạng thái vào LocalStorage.
- 📱 **Hỗ trợ PWA (Progressive Web App)**:
  - Cài đặt trực tiếp lên màn hình chính của điện thoại (iOS, Android) hoặc máy tính (Windows, macOS) như một ứng dụng độc lập.

---

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Thư viện UI**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **Components**: Thiết kế theo phong cách [shadcn/ui](https://ui.shadcn.com/) (`Card`, `Button`, `Badge`, `Progress`, `Input`, `Dialog`, `Separator`)
- **Icons**: [Lucide Icons](https://lucide.dev/) (`lucide-react`)
- **Ngôn ngữ**: TypeScript 5

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### 1. Yêu cầu môi trường
- [Node.js](https://nodejs.org/) phiên bản 18.18 trở lên (khuyên dùng Node.js 20+).
- Trình quản lý gói: `pnpm` (khuyến nghị), `npm` hoặc `yarn`.

### 2. Clone mã nguồn về máy
```bash
git clone https://github.com/BTM-XD1412/demnguockithi.git
cd demnguockithi
```

### 3. Cài đặt các gói phụ thuộc
```bash
# Sử dụng pnpm (khuyên dùng)
pnpm install

# Hoặc sử dụng npm
npm install
```

### 4. Khởi chạy môi trường phát triển (Development)
```bash
pnpm dev
# hoặc npm run dev
```

Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

### 5. Biên dịch sản phẩm (Production Build)
```bash
pnpm build
pnpm start
# hoặc npm run build && npm start
```

---

## 🎨 Hướng Dẫn Tự Rewrite & Tùy Chỉnh Theo Ý Mình

Dự án được cấu trúc dạng module rõ ràng, giúp bạn dễ dàng chỉnh sửa lại cho bất kỳ kỳ thi nào khác (THPT 2028, kỳ thi vào 10, IELTS, TOEIC, v.v.):

### 1. Đổi mốc thời gian và môn thi
Mở file **`src/lib/constants.ts`**:
```typescript
// Thời gian đích đếm ngược (định dạng ISO 8601 kèm múi giờ +07:00)
export const EXAM_TARGET_DATE = "2027-06-11T00:00:00+07:00";
export const EXAM_YEAR = 2027;
export const EXAM_TITLE = "Kỳ thi tốt nghiệp THPT 2027";
export const EXAM_DATE_DISPLAY = "11/06/2027";

// Ngày bắt đầu năm học (dùng để tính % thanh tiến trình)
export const SCHOOL_YEAR_START_DATE = "2026-09-05T00:00:00+07:00";
export const SCHOOL_YEAR_START_DISPLAY = "05/09/2026";

// Lịch thi chi tiết từng môn
export const EXAM_SCHEDULE_2027: ExamScheduleItem[] = [
  {
    id: "literature",
    name: "Ngữ văn",
    dateDisplay: "11/6/2027",
    timeDisplay: "07:30",
    durationMinutes: 120,
    targetDate: "2027-06-11T07:30:00+07:00",
    type: "literature",
  },
  // Thêm / sửa các môn thi khác tại đây...
];
```

### 2. Tùy chỉnh kho danh ngôn & Tốc độ chuyển
- **Thêm/bớt câu danh ngôn**: Mở file **`src/lib/quotes.ts`**, chỉnh sửa mảng `QUOTES`:
  ```typescript
  {
    id: 1,
    text: "Nội dung câu danh ngôn...",
    author: "Tên tác giả",
    translation: "Bản dịch hoặc ghi chú phụ (tùy chọn)",
  }
  ```
- **Đổi tốc độ tự động xoay danh ngôn**: Mở file **`src/components/countdown/exam-dashboard.tsx`**, sửa prop `autoRotateInterval`:
  ```tsx
  {/* Đổi thành 5000 (5 giây), 8000 (8 giây), 10000 (10 giây)... */}
  <QuoteCard initialQuote={initialQuote} autoRotateInterval={5000} />
  ```

### 3. Thay đổi hình nền mặc định & Thư viện hình nền
1. Thêm ảnh nền mới của bạn vào thư mục **`public/images/`** (ví dụ: `my-background.jpg`).
2. Mở file **`src/lib/constants.ts`** và cập nhật mảng `BACKGROUND_IMAGES`:
   ```typescript
   export const BACKGROUND_IMAGES = [
     "/images/background1.png",
     "/images/background2.png",
     "/images/my-background.jpg",
   ];
   ```

### 4. Thay đổi danh sách phát nhạc YouTube mặc định
Mở file **`src/components/countdown/music-player.tsx`**:
- Đổi video khởi tạo:
  ```typescript
  const DEFAULT_MEDIA: MediaTarget = {
    type: "video", // hoặc "playlist"
    id: "VIDEO_ID_HOAC_PLAYLIST_ID",
  };
  ```
- Thêm hoặc sửa các nút preset nhạc gợi ý trong mảng `PRESET_TRACKS`.

### 5. Tùy chỉnh thông tin website, SEO & Embed
- **Thông tin trang & Tác giả**: Mở `src/lib/constants.ts` và sửa object `SITE_METADATA`.
- **Tên miền & Ảnh preview mạng xã hội (Open Graph / Discord / Facebook)**: Mở `app/layout.tsx`:
  - Đổi `metadataBase`: `new URL("https://your-domain.com")`
  - Đổi `openGraph.images` và `twitter.images` sang hình ảnh bạn muốn hiển thị.

---

## 📂 Cấu Trúc Thư Mục Dự Án

```
demnguockithi/
├── app/                        # Next.js App Router
│   ├── (main)/info/            # Trang thông tin chi tiết kỳ thi
│   ├── api/                    # API endpoints (exam-info, quotes)
│   ├── globals.css             # Thiết lập CSS Tokens & Tailwind
│   ├── layout.tsx              # Root Layout, Fonts, SEO Metadata
│   ├── manifest.ts             # Cấu hình PWA Web App Manifest
│   └── page.tsx                # Trang chủ chính
├── public/                     # Tài nguyên tĩnh
│   ├── favicon/                # Bộ biểu tượng ứng dụng và favicon
│   ├── fonts/                  # Phông chữ Averta
│   └── images/                 # Hình ảnh nền và ảnh preview
└── src/
    ├── components/
    │   ├── countdown/          # Các component đếm ngược & công cụ
    │   │   ├── background-context.tsx
    │   │   ├── exam-dashboard.tsx      # Bảng đếm ngược & lịch thi
    │   │   ├── exam-schedule-card.tsx  # Thẻ lịch thi chi tiết
    │   │   ├── music-player.tsx        # Trình phát nhạc YouTube
    │   │   ├── pomodoro-timer.tsx      # Đồng hồ Pomodoro
    │   │   ├── quote-card.tsx          # Danh ngôn xoay trượt
    │   │   ├── school-progress.tsx     # Tiến trình năm học
    │   │   └── study-tools-section.tsx # Lưới công cụ học tập
    │   ├── layout/             # Header, Footer
    │   ├── pwa/                # Nút cài đặt ứng dụng PWA
    │   └── ui/                 # Bộ UI components shadcn
    └── lib/
        ├── api-utils.ts        # Tiện ích định dạng phản hồi API
        ├── constants.ts        # Hằng số mốc thi, ngày khai giảng
        ├── quotes.ts           # Tuyển tập danh ngôn tạo động lực
        └── utils.ts            # Tiện ích cn (clsx + tailwind-merge)
```

---

## 📄 Bản Quyền & Giấy Phép

Dự án được xây dựng và chia sẻ với mục đích phi thương mại hỗ trợ các bạn học sinh trong quá trình ôn luyện cho kỳ thi tốt nghiệp THPT.
Bạn có thể sử dụng các công cụ AI để tự biến nó thành sản phẩm của chính mình nhưng không được sử dụng vào mục đích thương mại.

- Phát triển bởi: **[BTM-XD1412](https://github.com/BTM-XD1412)**
- Mọi đóng góp ý kiến hoặc phản hồi xin gửi về email: `butsimptachyon@btmxd1412.dev`
- Dự án có sử dụng hỗ trợ từ AI Agents.