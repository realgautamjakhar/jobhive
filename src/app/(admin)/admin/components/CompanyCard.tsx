import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AiFillLinkedin, AiOutlineGlobal } from "react-icons/ai";
import { FiArrowUpRight } from "react-icons/fi";
import { motionItem } from "~/utils/animation";
import type { RouterOutputs } from "~/utils/api";

type Company = RouterOutputs["company"]["getAll"][0];

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <motion.li
      variants={motionItem}
      whileHover={{ scale: 1.025 }}
      className="group relative grid grid-cols-[1fr_auto] rounded-2xl  bg-white p-4 shadow-2xl  shadow-accent-100/50 md:grid-cols-1  "
    >
      <Link
        href={`/company/${company.id}`}
        title={`${company.name} more info and jobs`}
        className="grid w-full grid-cols-[auto_1fr_auto]  gap-2 gap-x-4   md:grid-cols-1 md:text-center"
      >
        <Image
          width={75}
          height={75}
          src={company.logo}
          className="m-auto aspect-square h-full max-h-16 w-full object-contain"
          alt={company.name}
        />
        <FiArrowUpRight
          size={22}
          className=" absolute top-4 right-4 text-accent-100 group-hover:scale-150"
        />
        <div className=" grid md:gap-2">
          <h2 className=" text-xl font-medium capitalize">
            {company.name.toLowerCase()}
          </h2>
          <div className="  flex w-full gap-4 md:justify-center">
            <a
              title={`${company.name} website link`}
              href={company.website}
              target="_blank"
            >
              <AiOutlineGlobal
                className=" text-accent-300 transition-all duration-300 ease-in-out hover:text-accent-500 "
                size={18}
              />
            </a>
            <a
              title={`${company.name} linkedin profile link`}
              href={company.linkedin}
              target="_blank"
              className=" text-accent-300 transition-all duration-300 ease-in-out hover:text-accent-500 "
            >
              <AiFillLinkedin size={18} />
            </a>
          </div>
        </div>{" "}
      </Link>
      <Link
        href={`/company/${company.id}`}
        title={`${company.name} more info and jobs`}
        className=" mx-auto mt-4 h-fit w-fit rounded-full bg-dark-500  px-4 py-1  text-sm text-gray-100 transition-all duration-300 ease-in-out hover:scale-105"
      >
        See jobs
      </Link>
    </motion.li>
  );
};

export default CompanyCard;
