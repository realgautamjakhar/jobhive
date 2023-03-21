"use client";
import React from "react";
import type { IconType } from "react-icons";
import {
  BiBriefcase,
  BiBuildings,
  BiCodeBlock,
  BiDirections,
  BiLayout,
  BiRupee,
} from "react-icons/bi";
import { BsPinMap } from "react-icons/bs";
import TimeAgoComponent from "~/components/TimeAgo";
import type { RouterOutputs } from "~/utils/api";

type Job = RouterOutputs["job"]["get"];

const TextItem = ({
  prefix,
  suffix,
  icon: Icon,
}: {
  prefix: string;
  suffix: string | number;
  icon: IconType;
}) => {
  return (
    <li className="  flex  items-center gap-2 text-sm capitalize">
      <Icon size={22} className="text-accent-500" />{" "}
      <span className="text-gray-500">{prefix}</span> :{" "}
      <span className="text-gray-800">{suffix}</span>
    </li>
  );
};

const JobHeader = ({ job }: { job: Job }) => {
  return (
    <div>
      <h2 className=" py-4 text-[clamp(1rem,10vw,2rem)] font-medium capitalize">
        {job.title}
      </h2>
      <div className=" flex gap-2">
        <p className=" w-fit rounded-full bg-dark-500 px-4 py-1 text-xs text-white">
          <TimeAgoComponent createdAt={job.createdAt} />
        </p>
        <p className=" w-fit rounded-full bg-dark-500 px-4 py-1 text-xs  capitalize text-white">
          {job.type.replaceAll("_", " ").toLowerCase()}
        </p>
        <p className=" w-fit rounded-full bg-dark-500 px-4 py-1 text-xs capitalize text-white">
          {job.workPlace.replaceAll("_", " ").toLowerCase()}
        </p>
      </div>
      <ul className=" grid gap-2  py-4 md:grid-cols-2">
        <TextItem
          prefix="Company"
          suffix={job.company.name}
          icon={BiBuildings}
        />
        {!(job.workPlace === "REMOTE") && (
          <TextItem
            prefix="Location"
            suffix={job.location ? job.location : "Not Disclosed"}
            icon={BsPinMap}
          />
        )}
        <TextItem
          prefix="Salary"
          suffix={job?.salary ? ` ${job?.salary} lacs PA` : "Not Disclosed"}
          icon={BiRupee}
        />
        <TextItem
          prefix="Experience"
          suffix={
            job?.experienceMin !== job?.experienceMax
              ? ` ${
                  job?.experienceMin === 0 ? "Fresher" : job.experienceMin
                } - ${job.experienceMax} yrs`
              : "Not Disclosed"
          }
          icon={BiBriefcase}
        />

        <TextItem
          prefix="Department"
          suffix={job?.category.name}
          icon={BiDirections}
        />
        <TextItem
          prefix="Role"
          suffix={job?.subCategory.name}
          icon={BiCodeBlock}
        />
      </ul>
    </div>
  );
};

export default JobHeader;
