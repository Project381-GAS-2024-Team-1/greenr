import { PrismaClient } from "@prisma/client";

export * from "@/lib/db/comment";
export * from "@/lib/db/device";
export * from "@/lib/db/follow";
export * from "@/lib/db/post";
export * from "@/lib/db/prediction";
export * from "@/lib/db/system-history";
export * from "@/lib/db/system";
export * from "@/lib/db/user-history";
export * from "@/lib/db/user";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const db = globalThis.prismaGlobal ?? prismaClientSingleton();
