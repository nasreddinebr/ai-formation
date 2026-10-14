import type {
  ChangePasswordPayload,
  CourseProgress,
  CourseProgressPayload,
  Dashboard,
  LoginPayload,
  MessageResponse,
  ProfileUpdatePayload,
  RegisterPayload,
  User,
  ValidationField,
} from "./types";

export * from "./types";

/**
 * Base URL of the FastAPI back office as seen by the browser.
 *
 * Empty `NEXT_PUBLIC_API_BASE` means same-origin: requests go through the
 * Next.js proxy at `/backend/*` (see `src/app/backend/[...path]/route.ts`), so
 * the HttpOnly cookies work without any CORS configuration.
 */
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "").replace(/\/+$/, "") || "/backend";

const CSRF_COOKIE = "af_csrf";
const CSRF_HEADER = "x-csrf-token";
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
// 401 responses from these endpoints are meaningful, never auto-retried.
const NO_REFRESH = new Set([
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
  "/api/auth/logout",
]);

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fields: ValidationField[];

  constructor(
    status: number,
    code: string,
    message: string,
    fields: ValidationField[] = [],
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function csrfHeaders(): Record<string, string> {
  const token = readCookie(CSRF_COOKIE);
  return token ? { [CSRF_HEADER]: token } : {};
}

async function bootstrapCsrf(): Promise<void> {
  if (readCookie(CSRF_COOKIE)) return;
  try {
    await fetch(`${API_BASE}/api/auth/csrf`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });
  } catch {
    // The following request will surface a clearer error if the API is down.
  }
}

async function toApiError(response: Response): Promise<ApiError> {
  let code = "http_error";
  let message = `Erreur ${response.status}.`;
  let fields: ValidationField[] = [];

  try {
    const payload = (await response.json()) as {
      detail?: string | { code?: string; message?: string; fields?: ValidationField[] };
    };
    const detail = payload.detail;
    if (typeof detail === "string") {
      message = detail;
    } else if (detail) {
      code = detail.code ?? code;
      message = detail.message ?? message;
      fields = detail.fields ?? [];
    }
  } catch {
    // Non-JSON error body: keep the generic message.
  }

  return new ApiError(response.status, code, message, fields);
}

async function parse<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

let refreshPromise: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        await bootstrapCsrf();
        const response = await fetch(`${API_BASE}/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
          headers: csrfHeaders(),
          cache: "no-store",
        });
        return response.ok;
      } catch {
        return false;
      }
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  retryOnUnauthorized?: boolean;
}

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const method = options.method ?? "GET";

  if (!SAFE_METHODS.has(method)) {
    await bootstrapCsrf();
  }

  const send = (): Promise<Response> => {
    const headers: Record<string, string> = { ...csrfHeaders() };
    if (options.body !== undefined) {
      headers["content-type"] = "application/json";
    }
    return fetch(`${API_BASE}${path}`, {
      method,
      credentials: "include",
      headers,
      cache: "no-store",
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  };

  let response = await send();

  if (
    response.status === 401 &&
    options.retryOnUnauthorized !== false &&
    !NO_REFRESH.has(path)
  ) {
    if (await refreshSession()) {
      response = await send();
    }
  }

  if (!response.ok) {
    throw await toApiError(response);
  }

  return parse<T>(response);
}

export const api = {
  /** Ensure a double-submit CSRF cookie exists before the first mutation. */
  csrf: () => apiRequest<MessageResponse>("/api/auth/csrf", { retryOnUnauthorized: false }),

  register: (payload: RegisterPayload) =>
    apiRequest<User>("/api/auth/register", {
      method: "POST",
      body: payload,
      retryOnUnauthorized: false,
    }),

  login: (payload: LoginPayload) =>
    apiRequest<User>("/api/auth/login", {
      method: "POST",
      body: payload,
      retryOnUnauthorized: false,
    }),

  logout: () =>
    apiRequest<MessageResponse>("/api/auth/logout", {
      method: "POST",
      retryOnUnauthorized: false,
    }),

  me: () => apiRequest<User>("/api/auth/me"),

  profile: () => apiRequest<User>("/api/profile"),

  updateProfile: (payload: ProfileUpdatePayload) =>
    apiRequest<User>("/api/profile", { method: "PATCH", body: payload }),

  changePassword: (payload: ChangePasswordPayload) =>
    apiRequest<MessageResponse>("/api/profile/password", {
      method: "POST",
      body: payload,
      retryOnUnauthorized: false,
    }),

  dashboard: () => apiRequest<Dashboard>("/api/progress"),

  recordVisit: (courseId: number, payload: CourseProgressPayload) =>
    apiRequest<CourseProgress>(`/api/progress/${courseId}`, {
      method: "PUT",
      body: payload,
    }),

  removeCourse: (courseId: number) =>
    apiRequest<MessageResponse>(`/api/progress/${courseId}`, { method: "DELETE" }),
};
