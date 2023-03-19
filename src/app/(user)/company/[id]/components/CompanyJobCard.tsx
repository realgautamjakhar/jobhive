import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { IconType } from "react-icons";
import { BiBriefcase, BiRupee } from "react-icons/bi";
import TimeAgoComponent from "~/components/TimeAgo";
import { motionItem } from "~/utils/animation";
import type { RouterOutputs } from "~/utils/api";

type Job = RouterOutputs["job"]["create"];

const TextItem = ({
  prefix,
  suffix,
  icon: Icon,
}: {
  prefix?: string;
  suffix: string | number;
  icon: IconType;
}) => {
  return (
    <li className="  flex  items-center gap-1 text-sm capitalize">
      <Icon size={18} className="text-accent-400" title={prefix ?? ""} />
      <span className="text-sm text-gray-800">{suffix}</span>
    </li>
  );
};

const JobCard = ({ job }: { job: Job }) => {
  return (
    <motion.li
      variants={motionItem}
      whileHover={{
        scale: 1.025,
      }}
      className=" grid items-center gap-2 rounded-2xl bg-light-100 p-4 shadow-2xl shadow-dark-100/10 hover:shadow-accent-100 sm:grid-cols-[1fr_auto]"
    >
      <Link href={`/job/${job.id}`}>
        <h2 className="font-medium capitalize line-clamp-2">
          {job.title.toLowerCase()}
        </h2>

        <div className=" col-span-2 my-2 flex flex-wrap gap-2 md:col-span-1">
          <p className="flex h-full  max-h-6 w-fit items-center rounded-full bg-dark-500 py-1 px-4  text-xs capitalize text-gray-100">
            <TimeAgoComponent createdAt={job.createdAt} />
          </p>
          <p className="flex  h-full max-h-6 w-fit items-center rounded-full bg-dark-100 py-1 px-4  text-xs capitalize text-gray-800">
            {job.type.replaceAll("_", " ").toLowerCase()}
          </p>
          <p
            className={`h-full max-h-6 w-fit rounded-full bg-dark-100 px-4 py-1 text-xs capitalize text-gray-700 ${
              job.workPlace === "REMOTE" ? " bg-green-300" : ""
            }`}
          >
            {job.workPlace.replaceAll("_", " ").toLowerCase()}
          </p>
        </div>
        <ul className=" col-span-2 flex flex-wrap items-center gap-4 md:col-span-1">
          <TextItem
            prefix="Salary"
            suffix={job.salary ? `${job.salary} lpa` : "Not Disclosed"}
            icon={BiRupee}
          />
          <TextItem
            suffix={
              job?.experienceMin !== job?.experienceMax
                ? ` ${
                    job?.experienceMin === 0 ? "Fresher" : job.experienceMin
                  } - ${job.experienceMax} yrs`
                : "Not Disclosed"
            }
            icon={BiBriefcase}
          />
        </ul>
      </Link>
      <motion.a
        href={job.applyUrl}
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        whileHover={{
          scale: 1.05,
          opacity: 0.7,
        }}
        title={`${job.title.toLowerCase()} apply link `}
        target="_blank"
        className=" cursor-pointer rounded-full bg-accent-500 px-4 py-2 text-center text-sm text-white shadow-xl shadow-accent-100/50 "
      >
        Apply
      </motion.a>
    </motion.li>
  );
};

export default JobCard;
