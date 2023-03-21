import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
export const jobRouter = createTRPCRouter({
  adminGetAllJobs: publicProcedure.query(() => {
    return prisma.job.findMany({
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getAllJobsShowMore: publicProcedure
    .input(
      z.object({
        skip: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const limit = 5;
      const jobs = await prisma.job.findMany({
        where: {
          approved: {
            equals: true,
          },
        },
        include: {
          company: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit + 1, // fetch one more tweet than needed
        skip: input.skip || 0,
      });
      const hasMore = jobs?.length > limit;
      if (hasMore) {
        jobs.pop();
      }
      return {
        jobs,
        hasMore,
      };
    }),

  //Get single Jobs listing
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return prisma.job.findUnique({
        where: {
          id: input.id,
        },
        include: {
          company: true,
          category: true,
          subCategory: true,
        },
      });
    }),
  //Job Search Quick Search (Home of the website)
  getSearch: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.job.findMany({
        where: {
          title: {
            contains: input.searchTerm,
            mode: "insensitive",
          },
          desc: {
            contains: input.searchTerm,
            mode: "insensitive",
          },
        },
        take: 5,
        include: {
          company: true,
          category: true,
          subCategory: true,
        },
      });
    }),
  create: adminProcedure
    .input(
      z.object({
        title: z.string(),
        desc: z.string(),
        type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY"]),
        education: z.string(),
        role: z.string(),
        industry: z.string(),
        department: z.string(),
        experienceMin: z.number(),
        experienceMax: z.number(),
        salary: z.number(),
        workPlace: z.enum(["OFFICE", "REMOTE", "HYBRID"]),
        location: z.string(),
        companyId: z.string(),
        categoryId: z.string(),
        subCategoryId: z.string(),
        approved: z.boolean(),
        featured: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.job.create({
        data: {
          title: input.title,
          desc: input.desc,
          type: input.type,
          education: input.education,
          role: input.role,
          industry: input.industry,
          department: input.department,
          experienceMin: input.experienceMin,
          experienceMax: input.experienceMax,
          salary: input.salary,
          workPlace: input.workPlace,
          location: input.location,
          companyId: input.companyId,
          categoryId: input.categoryId,
          subCategoryId: input.subCategoryId,
          approved: input.approved,
          featured: input.featured,
        },
      });
    }),
  editJob: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        desc: z.string(),
        type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY"]),
        education: z.string(),
        role: z.string(),
        industry: z.string(),
        department: z.string(),
        experienceMin: z.number(),
        experienceMax: z.number(),
        salary: z.number(),
        workPlace: z.enum(["OFFICE", "REMOTE", "HYBRID"]),
        location: z.string(),
        companyId: z.string(),
        categoryId: z.string(),
        subCategoryId: z.string(),
        approved: z.boolean(),
        featured: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.job.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          desc: input.desc,
          type: input.type,
          education: input.education,
          role: input.role,
          industry: input.industry,
          department: input.department,
          experienceMin: input.experienceMin,
          experienceMax: input.experienceMax,
          salary: input.salary,
          workPlace: input.workPlace,
          location: input.location,
          companyId: input.companyId,
          categoryId: input.categoryId,
          subCategoryId: input.subCategoryId,
          approved: input.approved,
          featured: input.featured,
        },
      });
    }),
  deleteJob: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.job.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
