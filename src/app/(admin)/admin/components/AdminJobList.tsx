"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { api } from "~/utils/api";
import JobCardSkeleton from "../../../../components/skeleton/JobCardSkeleton";
import { motionContainer } from "~/utils/animation";
import JobCard from "~/components/job/JobCard";

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
          <AnimatePresence>
            {jobs?.map((job) => {
              return <JobCard job={job} key={job.id} />;
            })}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <ul className="grid gap-6 ">{skeleton}</ul>
      )}
    </>
  );
};

export default api.withTRPC(JobList);
