import { appRouter } from "~/server/api/root";

export default async function getCompanyData({ id }: { id: string }) {
  const caller = appRouter.createCaller(undefined);
  const data = await caller.company.get({ id });

  return data;
}
