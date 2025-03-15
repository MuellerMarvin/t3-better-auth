import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { env } from "~/env";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  google: {
    enabled: true,
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    deleteUser: {
      enabled: true,
      beforeDelete: async ({ id }) => {
        await prisma.post.updateMany({
          where: {
            createdById: id,
          },
          data: {
            createdById: undefined,
            name: "Deleted User",
          },
        });
      },
    },
  },
  plugins: [nextCookies()],
});
