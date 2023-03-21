import Link from "next/link";
import CompanyList from "~/components/company/CompanyList";
import Search from "~/components/home/Search";
import JobList from "~/components/job/JobList";

export const metadata = {
  title: "JobHive",
  description: "A place where you find your dream job",
  icons: {
    icon: "/assets/logo/brandLogo.svg",
  },
};

const HomePage = () => {
  return (
    <main className=" mx-auto w-full max-w-7xl px-4 pb-16">
      <Search />
      <Link
        href={"/search"}
        className=" relative w-fit items-center gap-2 rounded-2xl bg-white py-2.5 px-4 text-center shadow-2xl shadow-accent-100/50 ring-1 ring-accent-100 hover:shadow-accent-200 "
      >
        All Jobs
      </Link>
      <div className=" grid gap-6 md:grid-cols-2">
        <div className=" hidden md:block">
          <h2 className=" py-4 text-center text-[clamp(1rem,6vw,2rem)] font-medium capitalize">
            Companies
          </h2>
          <CompanyList />
        </div>
        <div>
          <h2 className=" py-4 text-center text-[clamp(1rem,6vw,2rem)] font-medium capitalize">
            Jobs
          </h2>
          <JobList />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
