import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL manquant. Copiez .env.example vers .env puis renseignez la variable."
    );
  }

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
}

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}

export interface DatabaseHealthReport {
  ok: boolean;
  latencyMs: number;
  serverVersion?: string;
  userCount?: number;
  error?: string;
}

function describeError(error: unknown): string {
  const parts: string[] = [];
  let current: unknown = error;
  let depth = 0;

  while (current && depth < 5) {
    const message =
      current instanceof Error ? current.message : String(current);
    const code = (current as { code?: string }).code;
    const line = code ? `${code}: ${message}` : message;
    if (line && !parts.includes(line)) parts.push(line);
    current = (current as { cause?: unknown }).cause;
    depth += 1;
  }

  return parts.join(" | ");
}

export async function checkDatabaseConnection(): Promise<DatabaseHealthReport> {
  const startedAt = performance.now();

  try {
    const prisma = getPrisma();
    const rows = await prisma.$queryRaw<
      Array<{ version: string }>
    >`SELECT version() AS version`;
    const userCount = await prisma.user.count();

    return {
      ok: true,
      latencyMs: Math.round(performance.now() - startedAt),
      serverVersion: rows[0]?.version,
      userCount,
    };
  } catch (error) {
    return {
      ok: false,
      latencyMs: Math.round(performance.now() - startedAt),
      error: describeError(error),
    };
  }
}
