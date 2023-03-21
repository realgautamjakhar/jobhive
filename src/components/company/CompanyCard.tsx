import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AiFillLinkedin, AiOutlineGlobal } from "react-icons/ai";
import { motionItem } from "~/utils/animation";
import type { RouterOutputs } from "~/utils/api";

type Company = RouterOutputs["company"]["getAll"][0];

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <motion.li
      variants={motionItem}
      whileHover={{ scale: 1.025 }}
      transition={{
        type: "spring",
      }}
      className="group relative grid grid-cols-[1fr_auto] rounded-2xl bg-white p-4   shadow-2xl shadow-accent-100/50 hover:shadow-accent-200  hover:ring-2 hover:ring-accent-200  md:grid-cols-1"
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
          className="m-auto aspect-square h-full max-h-16 w-full  max-w-[5rem] object-contain"
          alt={company.name}
        />
        <div className=" grid md:gap-2">
          <h2 className=" text-lg font-medium capitalize line-clamp-1">
            {company.name.toLowerCase()}
          </h2>
          {/* <div className="  flex w-full gap-4 text-gray-400 md:justify-center">
            <a
              title={`${company.name} website link`}
              href={company.website}
              target="_blank"
            >
              <AiOutlineGlobal
                className="  transition-all duration-300 ease-in-out hover:text-accent-500 "
                size={18}
              />
            </a>
            <a
              title={`${company.name} linkedin profile link`}
              href={company.linkedin}
              target="_blank"
              className="   transition-all duration-300 ease-in-out hover:text-accent-500 "
            >
              <AiFillLinkedin size={18} />
            </a>
          </div> */}
        </div>
      </Link>
    </motion.li>
  );
};

export default CompanyCard;
