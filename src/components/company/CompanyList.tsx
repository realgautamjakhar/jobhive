"use client";
import { motion } from "framer-motion";
import React from "react";
import { api } from "~/utils/api";
import CompanyCard from "./CompanyCard";

const CompanyList = () => {
  const { data: companies } = api.company.getAll.useQuery(undefined, {});

  return (
    <section>
      <h2>Listed Companies</h2>
      <motion.ul className=" grid grid-cols-[repeat(auto-fit,clamp(150px,30vw,175px))] gap-4  p-4">
        {companies?.map((company) => {
          return <CompanyCard key={company.id} company={company} />;
        })}
      </motion.ul>
    </section>
  );
};

export default api.withTRPC(CompanyList);
