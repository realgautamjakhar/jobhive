import type { Company } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <motion.li
      whileHover={{ scale: 1.1 }}
      className="grid  place-content-center items-center gap-2 rounded-md p-4  text-center shadow-2xl shadow-accent-100 hover:shadow-accent-200"
    >
      <Image
        width={75}
        height={75}
        src={company.logo}
        className="mx-auto h-full max-h-16 w-fit"
        alt={company.name}
      />
      <h2 className=" text-xl font-medium capitalize">{company.name}</h2>
      <Link href={`/company/${company.id}`}>See jobs</Link>
    </motion.li>
  );
};

export default CompanyCard;
