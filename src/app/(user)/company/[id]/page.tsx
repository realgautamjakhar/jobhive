import Image from "next/image";
import React from "react";
import { AiFillLinkedin, AiOutlineGlobal } from "react-icons/ai";
import JobList from "./components/JobList";
import type { Metadata } from "next";
import { prisma } from "~/server/db";
import CompanyAdminControl from "~/app/(admin)/admin/components/CompanyAdminControl";

type Params = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Params): Promise<Metadata> {
  const company = await prisma.company.findUnique({
    where: {
      id: id,
    },
  });
  if (!company.name)
    return {
      title: "Job looo",
    };
  return {
    title: company.name,
  };
}

const CompanyPage = async ({ params: { id } }: Params) => {
  const company = await prisma.company.findUnique({
    where: {
      id: id,
    },
    include: {
      jobs: true,
    },
  });
  return (
    <main className=" mx-auto h-full w-full max-w-7xl py-10 px-4">
      <CompanyAdminControl companyId={company.id} />
      <div className=" relative grid grid-cols-[minmax(auto,30%)_1fr] rounded-md bg-accentGradient shadow-2xl shadow-accent-100 ">
        {/* {session?.user.isAdmin && (
          <div className="  absolute top-4 right-4">
            <UpdateCompanyModal company={company} />
          </div>
        )} */}

        <div className="  flex h-full w-full md:bg-white/25">
          <Image
            src={company?.logo}
            alt={company?.name}
            width={100}
            height={100}
            className="m-auto h-fit max-h-12 w-fit object-contain md:max-h-32"
          />
        </div>
        <div className=" grid justify-end p-4 px-6">
          <h2 className="  text-[clamp(1rem,10vw,7rem)] font-medium capitalize text-gray-200">
            {company.name}
          </h2>
          <div className=" flex justify-end gap-4 py-4">
            <a title="website link" href={company.website} target="_blank">
              <AiOutlineGlobal className="h-6 w-6 text-gray-100" />
            </a>
            <a title="Linkedin link" href={company.linkedin} target="_blank">
              <AiFillLinkedin className="h-6 w-6 text-gray-100" />
            </a>
          </div>
        </div>
      </div>
      <div className=" mt-16 grid gap-6 md:gap-10 lg:grid-cols-[40%_1fr] ">
        <div className=" grid  h-fit gap-4 ">
          <h2 className=" text-start text-3xl font-medium text-gray-700">
            Company Description
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: `${company.desc}` }}
            className=" richtext max-w-[60ch] py-6 text-sm"
          />
        </div>
        <div>
          <h2 className=" text-end text-3xl font-medium text-gray-700">
            Job Listing
          </h2>
          {company.jobs.length > 0 ? (
            <>
              <JobList jobs={company.jobs} />
            </>
          ) : (
            <p className=" py-6 text-end">No Job Listing From this company</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default CompanyPage;