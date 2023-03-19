import { appRouter } from "~/server/api/root";

export default async function getJobData({ id }: { id: string }) {
  // const json = {
  //   json: {
  //     id: id,
  //   },
  // };
  // const encodedJson = encodeURIComponent(JSON.stringify(json));

  // const res = await fetch(
  //   `http://localhost:3000/api/trpc/job.get?input=${encodedJson}`
  // );
  // const result = await res.json();

  // if (!res.ok) return undefined;
  // // const data = JSON.parse(result);
  // console.log(result.result.data.json);

  // return result.result.data.json;
  const caller = appRouter.createCaller(undefined);
  const data = await caller.job.get({ id });
  // console.log("data >>>>>>", data);

  return {
    ...data,
    updatedAt: new Date(data.updatedAt),
    createdAt: new Date(data.createdAt),
  };
}
