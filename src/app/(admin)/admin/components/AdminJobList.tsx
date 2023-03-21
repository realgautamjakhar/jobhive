"use client";
import { motion } from "framer-motion";
import React from "react";
import { api } from "~/utils/api";
import JobCard from "./JobCard";
import JobCardSkeleton from "../../../../components/skeleton/JobCardSkeleton";
export const motionContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,

    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const motionItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const JobList = () => {
  const { data: jobs, refetch: refetchJobs } =
    api.job.adminGetAllJobs.useQuery();

  const skeleton = [...Array(8).keys()].map((i) => {
    return <JobCardSkeleton key={i} />;
  });

  return (
    <>
      {jobs ? (
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={motionContainer}
          className="grid gap-6 "
        >
          {jobs?.map((job) => {
            return <JobCard refetch={refetchJobs} job={job} key={job.id} />;
          })}
        </motion.ul>
      ) : (
        <ul className="grid gap-6 ">{skeleton}</ul>
      )}
    </>
  );
};

export default api.withTRPC(JobList);
