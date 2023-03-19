"use client";
import { Job } from "@prisma/client";
import { motion } from "framer-motion";
import { motionContainer } from "~/utils/animation";
import CompanyJobCard from "./CompanyJobCard";

const JobList = ({ jobs }: { jobs: Job[] }) => {
  return (
    <motion.ul
      variants={motionContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-6 py-6"
    >
      {jobs.map((job) => {
        return <CompanyJobCard key={job.id} job={job} />;
      })}
    </motion.ul>
  );
};

export default JobList;
