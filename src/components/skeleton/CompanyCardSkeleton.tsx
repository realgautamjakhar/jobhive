import { motion } from "framer-motion";
import { motionItem } from "~/utils/animation";

const CompanyCardSkeleton = () => {
  return (
    <motion.li
      variants={motionItem}
      whileHover={{ scale: 1.05 }}
      transition={{
        type: "spring",
      }}
      className="group relative grid grid-cols-[1fr_auto] rounded-2xl bg-light-100 p-4 shadow-2xl  shadow-accent-100/50 md:grid-cols-1  "
    >
      <div className="grid w-full grid-cols-[auto_1fr_auto]  gap-2 gap-x-4   md:grid-cols-1 md:text-center">
        <img className="skeleton m-auto aspect-square h-20 w-20  rounded-full  object-contain" />
        <div className=" grid md:gap-2">
          <h2 className=" skeleton  w-26 h-4 rounded-full" />
          <h2 className=" skeleton  mx-auto h-4 w-[40%] rounded-full" />
        </div>
      </div>
    </motion.li>
  );
};

export default CompanyCardSkeleton;
