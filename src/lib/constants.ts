export const EXAM_TARGET_DATE = "2027-06-11T00:00:00+07:00";
export const EXAM_YEAR = 2027;
export const EXAM_TITLE = "Kỳ thi tốt nghiệp THPT 2027";
export const EXAM_DATE_DISPLAY = "11/06/2027";
export const IS_ESTIMATED = true;

export const SCHOOL_YEAR_START_DATE = "2026-09-05T00:00:00+07:00";
export const SCHOOL_YEAR_START_DISPLAY = "05/09/2026";

export interface ExamScheduleItem {
  id: string;
  name: string;
  dateDisplay: string;
  timeDisplay: string;
  durationMinutes: number;
  targetDate: string;
  type: "literature" | "math" | "elective1" | "elective2";
}

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
  {
    id: "math",
    name: "Toán",
    dateDisplay: "11/6/2027",
    timeDisplay: "14:20",
    durationMinutes: 90,
    targetDate: "2027-06-11T14:20:00+07:00",
    type: "math",
  },
  {
    id: "elective1",
    name: "Bài thi Tự chọn môn thứ nhất",
    dateDisplay: "12/6/2027",
    timeDisplay: "07:30",
    durationMinutes: 50,
    targetDate: "2027-06-12T07:30:00+07:00",
    type: "elective1",
  },
  {
    id: "elective2",
    name: "Bài thi Tự chọn môn thứ hai",
    dateDisplay: "12/6/2027",
    timeDisplay: "08:35",
    durationMinutes: 50,
    targetDate: "2027-06-12T08:35:00+07:00",
    type: "elective2",
  },
];

export const SITE_METADATA = {
  title: "Đếm ngược ngày thi tốt nghiệp THPT 2027",
  description: "Trang web đếm ngược ngày thi tốt nghiệp THPT 2027 dành cho học sinh THPT.",
  author: "BTM-XD1412",
  authorEmail: "butsimptachyon@btmxd1412.dev",
  githubRepo: "https://github.com/BTM-XD1412/demnguockithi",
};

export const BACKGROUND_IMAGES = [
  "/images/background1.png",
  "/images/background2.png",
  "/images/background3.png",
];
