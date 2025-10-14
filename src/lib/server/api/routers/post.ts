import { desc } from "drizzle-orm";
import { posts } from "~/db/schema";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/lib/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(posts).values({
        title: input.title,
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const latestPostResult = await ctx.db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(1);
    return latestPostResult[0] ?? null;
  }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSecretMessage: protectedProcedure.query(async ({}) => {
    return "You are logged in and can see this secret message!";
  }),
});
