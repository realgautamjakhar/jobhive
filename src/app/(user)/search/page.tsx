"use client";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import SecondaryButton from "~/components/button/SecondaryButton";
import JobCard from "~/components/job/JobCard";
import ComboBox from "~/components/select/ComboBox";
import JobCardSkeleton from "~/components/skeleton/JobCardSkeleton";
import { motionContainer } from "~/utils/animation";
import { api } from "~/utils/api";

type option = {
  id: string;
  category?: string;
  title: string;
};

const SearchPage = () => {
  const [jobs, setJobs] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<option>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<option>();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const { data: categories } = api.category.getAll.useQuery();
  const { data: subCategories } = api.subCategory.getAll.useQuery();

  const getJobs = api.job.getAllJobs.useMutation();

  const fetchJobs = async () => {
    const skip = jobs?.length * page || 0;
    const newData = await getJobs.mutateAsync({
      skip: skip,
      category: selectedCategory ? selectedCategory.title : "",
      subCategory: selectedSubCategory ? selectedSubCategory.title : "",
    });
    console.log(newData, skip);

    setJobs(newData.jobs);
    setHasMore(newData.hasMore);
  };

  const categoriesOptions: option[] = useMemo(() => {
    return categories?.map((category) => {
      return {
        title: category.name,
        id: category.id,
      };
    });
  }, [categories]);

  const subCategoriesOptions: option[] = useMemo(() => {
    return selectedCategory
      ? subCategories
          .filter((category) => category.category.id === selectedCategory.id)
          .map((category) => {
            return {
              id: category.id,
              title: category.name,
              category: category.category.id,
            };
          })
      : subCategories?.map((category) => {
          return {
            id: category.id,
            title: category.name,
          };
        });
  }, [selectedCategory, subCategories]);

  useEffect(() => {
    fetchJobs();
  }, [selectedCategory, selectedSubCategory, page]);
  console.log(page);
  const skeleton = [...Array(5).keys()].map((i) => {
    return <JobCardSkeleton key={i} />;
  });
  return (
    <main className=" mx-auto grid h-full w-full max-w-7xl gap-6 px-4 pb-16 md:grid-cols-[auto_1fr] md:py-10 ">
      <div className=" grid h-fit max-w-[250px] gap-6">
        {categories && (
          <ComboBox
            title="Category"
            options={categoriesOptions}
            onChange={setSelectedCategory}
          />
        )}
        {subCategories && (
          <ComboBox
            title="Sub Category"
            options={subCategoriesOptions}
            onChange={setSelectedSubCategory}
          />
        )}
      </div>
      <div>
        <>
          {jobs ? (
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={motionContainer}
              className="grid gap-6 "
            >
              {!getJobs.isLoading ? (
                <>
                  {jobs?.map((job) => {
                    return <JobCard job={job} key={job.id} />;
                  })}
                </>
              ) : (
                <>{skeleton}</>
              )}

              <div className=" my-6 flex justify-between">
                {page > 0 && (
                  <SecondaryButton
                    onClick={() => setPage((prev) => prev - 1)}
                    className=" relative mr-auto  w-fit rounded-full bg-dark-500 py-2 text-white shadow-2xl shadow-dark-500/50"
                    disable={getJobs.isLoading}
                  >
                    Prev
                  </SecondaryButton>
                )}
                {hasMore && (
                  <SecondaryButton
                    onClick={() => setPage((prev) => prev + 1)}
                    className=" relative ml-auto  w-fit rounded-full bg-dark-500 py-2 text-white shadow-2xl shadow-dark-500/50"
                    disable={getJobs.isLoading}
                  >
                    Next
                  </SecondaryButton>
                )}
              </div>
            </motion.ul>
          ) : null}
        </>
      </div>
    </main>
  );
};

export default SearchPage;
