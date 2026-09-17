import {
  EXAM_TARGET_DATE,
  EXAM_TITLE,
  EXAM_YEAR,
  EXAM_DATE_DISPLAY,
  IS_ESTIMATED,
  EXAM_SCHEDULE_2027,
  SCHOOL_YEAR_START_DATE,
} from "@/lib/constants";
import { createSuccessResponse } from "@/lib/api-utils";

export async function GET() {
  return createSuccessResponse({
    title: EXAM_TITLE,
    year: EXAM_YEAR,
    targetDate: EXAM_TARGET_DATE,
    displayDate: EXAM_DATE_DISPLAY,
    isEstimated: IS_ESTIMATED,
    schoolYearStart: SCHOOL_YEAR_START_DATE,
    schedule: EXAM_SCHEDULE_2027,
  });
}
