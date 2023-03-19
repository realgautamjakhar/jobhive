const CompanyCardSkeleton = () => {
  return (
    <li className=" grid justify-center gap-2 rounded-md bg-light-100 p-4 shadow-2xl shadow-dark-100/10">
      <img
        width={100}
        height={100}
        className="  skeleton  mx-auto h-14 w-14 rounded-full"
      />
      <p className="skeleton h-3 w-full rounded-full" />
      <p className="skeleton mx-auto  h-3 w-[40%] rounded-full" />
      <button className=" skeleton h-8 w-24 rounded-full" />
    </li>
  );
};

export default CompanyCardSkeleton;
