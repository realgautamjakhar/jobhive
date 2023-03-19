"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { IconType } from "react-icons";
import {
  BiBriefcase,
  BiBuildings,
  BiHomeAlt,
  BiLink,
  BiLinkExternal,
  BiMapPin,
  BiRupee,
} from "react-icons/bi";
import { BsEmojiNeutral } from "react-icons/bs";
import { motionContainer, motionItem } from "~/utils/animation";
import type { RouterOutputs } from "~/utils/api";

type Job = RouterOutputs["job"]["get"];

const InfoCard = ({
  prefix,
  suffix,
  icon: Icon,
}: {
  prefix: string;
  suffix: string;
  icon: IconType;
}) => {
  return (
    <motion.li
      variants={motionItem}
      className="flex items-center justify-between rounded-md bg-accent-300 p-4 capitalize shadow-2xl shadow-accent-400"
    >
      <div className=" flex items-center gap-2 text-sm">
        <Icon size={18} />
        {prefix}
      </div>
      {suffix}
    </motion.li>
  );
};

const SideBar = ({ job }: { job: Job }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className=" grid h-fit grid-rows-[200px_1fr] rounded-md bg-accentGradientV2 text-gray-100 shadow-2xl shadow-accent-300"
    >
      <div className=" grid grid-rows-[1fr_auto] justify-center bg-light-100/30">
        <div className=" flex flex-col items-center justify-center">
          <Image
            width={100}
            height={100}
            src={job.company.logo}
            alt={job.company.name}
            className="max-w-[10rem]"
          />
        </div>
        <Link
          href={`/company/${job.company.id}`}
          className=" flex items-center gap-2 py-4 text-sm underline"
        >
          More info and Listing
          <BiLinkExternal />
        </Link>
      </div>
      <motion.ul
        variants={motionContainer}
        initial="hidden"
        animate="visible"
        className=" flex flex-col gap-4 p-4"
      >
        <InfoCard
          prefix="Company"
          suffix={job.company.name}
          icon={BiBuildings}
        />
        <InfoCard
          prefix="Experience"
          suffix={`${job.experienceMin} - ${job.experienceMax} yr`}
          icon={BiBriefcase}
        />
        {job.salary > 0 && (
          <InfoCard
            prefix="Salary"
            suffix={`${job.salary} Lpa`}
            icon={BiRupee}
          />
        )}
        <InfoCard
          prefix="Work Place"
          suffix={job.workPlace.toLocaleLowerCase()}
          icon={
            job.workPlace === "OFFICE"
              ? BiBuildings
              : job.workPlace === "HYBRID"
              ? BsEmojiNeutral
              : BiHomeAlt
          }
        />
        {job.workPlace !== "REMOTE" && (
          <InfoCard
            prefix="Location"
            suffix={job.location.toLowerCase()}
            icon={BiMapPin}
          />
        )}
        <motion.a
          variants={motionContainer}
          href={job?.applyUrl}
          className={`mt-4  inline-flex cursor-pointer items-center justify-center gap-2  rounded-md bg-dark-500  py-2.5 px-2 capitalize text-white hover:scale-105  `}
        >
          Apply Here <BiLink size={18} />
        </motion.a>
      </motion.ul>
    </motion.div>
  );
};

export default SideBar;
