import { NextResponse } from "next/server";

export interface FetchInfo {
  fetchedAt: string;
  fromCache: boolean;
}

export interface ApiResponseSuccess<T> {
  success: true;
  data: T & { fetchInfo: FetchInfo };
  meta: {
    developed: string;
    [key: string]: unknown;
  };
}

export interface ApiResponseError {
  success: false;
  error: {
    code: string;
    message: string;
  };
  meta: {
    developed: string;
  };
}

/**
 * Creates standardized API success response per Rule 8 in .agents
 */
export function createSuccessResponse<T extends Record<string, unknown>>(
  data: T,
  options?: {
    fromCache?: boolean;
    status?: number;
    extraMeta?: Record<string, unknown>;
  }
) {
  const { fromCache = false, status = 200, extraMeta = {} } = options || {};

  const responseBody: ApiResponseSuccess<T> = {
    success: true,
    data: {
      ...data,
      fetchInfo: {
        fetchedAt: new Date().toISOString(),
        fromCache,
      },
    },
    meta: {
      developed: "Powered / Developer by butthongminh",
      ...extraMeta,
    },
  };

  return NextResponse.json(responseBody, { status });
}

export function createErrorResponse(
  message: string,
  code = "BAD_REQUEST",
  status = 400
) {
  const responseBody: ApiResponseError = {
    success: false,
    error: {
      code,
      message,
    },
    meta: {
      developed: "Powered / Developer by butthongminh",
    },
  };

  return NextResponse.json(responseBody, { status });
}
