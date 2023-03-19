"use client";
import { motion } from "framer-motion";
import React from "react";
import { motionContainer } from "~/utils/animation";
import { api } from "~/utils/api";
import CompanyCard from "./CompanyCard";
import CompanyCardSkeleton from "../../../../components/skeleton/CompanyCardSkeleton";

const AdminCompanyList = () => {
  const { data: companies, isLoading } = api.company.getAll.useQuery(
    undefined,
    {}
  );
  const skeleton = [...Array(8).keys()].map((i) => {
    return <CompanyCardSkeleton key={i} />;
  });
  if (isLoading) {
    return (
      <ul className=" grid h-fit  gap-6 md:grid-cols-[repeat(auto-fit,clamp(150px,30vw,175px))]">
        {skeleton}
      </ul>
    );
  }
  return (
    <motion.ul
      variants={motionContainer}
      initial="hidden"
      animate="visible"
      className=" grid h-fit  gap-6 md:grid-cols-[repeat(auto-fit,clamp(150px,30vw,175px))]"
    >
      {companies?.map((company) => {
        return <CompanyCard key={company.id} company={company} />;
      })}
    </motion.ul>
  );
};

export default api.withTRPC(AdminCompanyList);
