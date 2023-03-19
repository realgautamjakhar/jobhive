const JobCardSkeleton = () => {
  return (
    <li className=" grid items-center gap-2 rounded-2xl bg-light-100 p-4 shadow-2xl shadow-accent-100/50 hover:shadow-accent-100 md:grid-cols-[1fr_auto]">
      <div className="grid  grid-cols-[auto_1fr] grid-rows-[3,auto] items-center gap-y-2 gap-x-4  ">
        <img className=" skeleton aspect-square h-full h-10  overflow-hidden  rounded-full object-contain md:row-span-3 md:h-20" />
        <h2 className="font-medium capitalize line-clamp-2">
          <p className=" skeleton h-4 w-[100%]  rounded-full" />
        </h2>
        <div className=" col-span-2 my-2 flex flex-wrap gap-2 md:col-span-1">
          <p className=" skeleton h-4 w-[25%]  rounded-full" />
          <p className=" skeleton h-4 w-[25%]  rounded-full" />
          <p className=" skeleton h-4 w-[25%]  rounded-full" />
        </div>
        <ul className=" col-span-2 flex flex-wrap items-center gap-4 md:col-span-1">
          <p className=" skeleton h-4 w-[25%]  rounded-full" />
          <p className=" skeleton h-4 w-[25%]  rounded-full" />
        </ul>
      </div>
      <div className=" skeleton h-8 w-full min-w-[5rem] cursor-pointer rounded-full  px-4 py-2 text-center text-sm  shadow-xl shadow-accent-100/50 "></div>
    </li>
  );
};

export default JobCardSkeleton;
