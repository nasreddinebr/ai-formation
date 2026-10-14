import type { NextRequest } from "next/server";

/**
 * Same-origin proxy to the FastAPI back office.
 *
 * The browser calls `/backend/*`; this handler forwards the request to
 * `API_PROXY_TARGET` (the `backend` container in Docker). Kept in the Node.js
 * runtime so the target is resolved from the environment at request time,
 * which makes the same build work in every environment.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TARGET = (process.env.API_PROXY_TARGET ?? "http://localhost:8000").replace(/\/+$/, "");

// Headers that must not be forwarded verbatim (RFC 7230 §6.1 + length/host).
const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
  "set-cookie",
]);

interface ProxyContext {
  params: Promise<{ path: string[] }>;
}

async function proxy(request: NextRequest, context: ProxyContext): Promise<Response> {
  const { path } = await context.params;

  const target = new URL(`${TARGET}/${path.map(encodeURIComponent).join("/")}`);
  target.search = request.nextUrl.search;

  const headers = new Headers(request.headers);
  for (const name of HOP_BY_HOP) headers.delete(name);
  headers.set("x-forwarded-host", request.nextUrl.host);
  headers.set("x-forwarded-proto", request.nextUrl.protocol.replace(":", ""));

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const body = hasBody ? await request.arrayBuffer() : undefined;

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      method: request.method,
      headers,
      body,
      redirect: "manual",
      cache: "no-store",
    });
  } catch {
    return Response.json(
      { detail: { code: "upstream_unreachable", message: "Service temporairement indisponible." } },
      { status: 502 },
    );
  }

  const responseHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      responseHeaders.append(key, value);
    }
  });
  // A response may carry several Set-Cookie headers; preserve them all.
  const setCookies = (upstream.headers as Headers & { getSetCookie?: () => string[] })
    .getSetCookie?.() ?? [];
  for (const cookie of setCookies) {
    responseHeaders.append("set-cookie", cookie);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export function GET(request: NextRequest, context: ProxyContext): Promise<Response> {
  return proxy(request, context);
}

export function POST(request: NextRequest, context: ProxyContext): Promise<Response> {
  return proxy(request, context);
}

export function PUT(request: NextRequest, context: ProxyContext): Promise<Response> {
  return proxy(request, context);
}

export function PATCH(request: NextRequest, context: ProxyContext): Promise<Response> {
  return proxy(request, context);
}

export function DELETE(request: NextRequest, context: ProxyContext): Promise<Response> {
  return proxy(request, context);
}

export function HEAD(request: NextRequest, context: ProxyContext): Promise<Response> {
  return proxy(request, context);
}

export function OPTIONS(request: NextRequest, context: ProxyContext): Promise<Response> {
  return proxy(request, context);
}
