import type { Metadata } from "next";
import JobAdminControl from "~/app/(admin)/admin/components/JobAdminControl";
import { prisma } from "~/server/db";
import JobHeader from "./components/JobHeader";
import SideBar from "./components/SideBar";

type Params = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Params): Promise<Metadata> {
  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
  });
  return {
    title: job.title,
    applicationName: "Job hive",
    icons: {
      icon: "/assets/logo/brandLogo.svg",
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
export const revalidate = 60;

const JobPage = async ({ params: { id } }: Params) => {
  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
      subCategory: true,
      company: true,
    },
  });
  return (
    <main className=" mx-auto grid h-full w-full max-w-6xl py-10 px-4 md:grid-cols-[70%_1fr] ">
      <JobAdminControl jobId={job.id} />
      <div className="">
        <JobHeader job={job} />
        <div>
          <h2 className=" py-4 text-[clamp(1rem,10vw,1.5rem)] font-medium capitalize">
            Job Description
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: `${job.desc}` }}
            className=" richtext  max-w-[70ch] text-sm"
          />
        </div>
      </div>

      {/* Client side component due to framer motion animation  */}
      <SideBar job={job} />
    </main>
  );
};

export default JobPage;

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany();
  return jobs.map((job) => ({
    id: job.id.toString(),
  }));
}
