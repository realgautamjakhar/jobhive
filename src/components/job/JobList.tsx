"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import JobCard from "./JobCard";
import SecondaryButton from "~/components/button/SecondaryButton";
import JobCardSkeleton from "~/components/skeleton/JobCardSkeleton";

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
  const getJobs = api.job.getAllJobs.useMutation();
  const [jobs, setJobs] = useState(getJobs.data?.jobs);
  const [hasMore, setHasMore] = useState(false);

  async function fetchJobs() {
    const skip = jobs?.length || 0;
    //Backend is working on pagination like infinite scroll you have to add the previous job remove the duplicated and create whole new jobs and set to the state
    const newData = await getJobs.mutateAsync({ skip }); //Return new 5 jobs
    const uniqueJobs = removeDuplicates([
      ...(jobs || []),
      ...(newData?.jobs || []),
    ]);
    // const allJobs = [...(jobs || []), ...(newData?.jobs || [])];
    setJobs(uniqueJobs);
    setHasMore(newData.hasMore);
  }

  function removeDuplicates(jobs: any) {
    const jobSet = new Set();
    return jobs.filter((job) => {
      if (jobSet.has(job.id)) {
        return false;
      } else {
        jobSet.add(job.id);
        return true;
      }
    });
  }

  useEffect(() => {
    fetchJobs();
  }, []);

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
            return <JobCard job={job} key={job.id} />;
          })}
          {hasMore && (
            <SecondaryButton
              onClick={() => fetchJobs()}
              className=" relative rounded-full  bg-dark-500 py-2 text-white"
              loading={getJobs.isLoading}
              disable={getJobs.isLoading}
            >
              Load More
            </SecondaryButton>
          )}
        </motion.ul>
      ) : (
        <ul className="grid gap-6 ">{skeleton}</ul>
      )}
    </>
  );
};

export default api.withTRPC(JobList);
