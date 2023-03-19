import Search from "~/components/home/Search";
import JobList from "~/components/job/JobList";
import AdminCompanyList from "../(admin)/admin/components/AdminCompanyList";

export const metadata = {
  title: "JobHive",
  description: "A place where you find your dream job",
  icons: {
    icon: "/assets/logo/brandLogo.svg",
  },
};

const HomePage = () => {
  return (
    <main className=" mx-auto w-full max-w-7xl px-4">
      <Search />
      <div className=" grid gap-6 py-10 md:grid-cols-2">
        <div>
          <h2 className=" py-4 text-center text-[clamp(1rem,6vw,2rem)] font-medium capitalize">
            Top Companies
          </h2>
          <AdminCompanyList />
        </div>
        <div>
          <h2 className=" py-4 text-center text-[clamp(1rem,6vw,2rem)] font-medium capitalize">
            Jobs{" "}
          </h2>
          <JobList />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
