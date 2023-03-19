"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { motionContainer, motionItem } from "~/utils/animation";
import Image from "next/image";
import Link from "next/link";
import TimeAgoComponent from "../TimeAgo";
import SecondaryButton from "../button/SecondaryButton";
import { toast } from "react-hot-toast";

type Job = RouterOutputs["job"]["getAll"][0];

const Search = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedJobs, setSearchedJobs] = useState<Job[]>();

  const searchJob = api.job.getSearch.useMutation({
    onSuccess: (data) => {
      if (data.length) setSearchedJobs(data);
      else {
        toast.error("No Job with input found");
      }
    },
  });

  const handleSearch = async () => {
    if (searchInput)
      searchJob.mutate({
        searchTerm: searchInput,
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" relative mx-auto my-16  flex w-full max-w-2xl items-center justify-center rounded-full bg-light-100 p-2 shadow-2xl shadow-accent-100 "
    >
      <input
        type="text"
        value={searchInput}
        className=" w-full bg-transparent py-2 pl-10 text-xl focus:outline-none"
        placeholder="Search jobs"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <BiSearch
        size={24}
        className=" absolute inset-y-0 left-4 h-full  text-dark-500"
      />
      {searchInput && (
        <BiX
          size={24}
          onClick={() => {
            setSearchInput("");
            setSearchedJobs([]);
          }}
          className=" absolute inset-y-0 right-28 h-full cursor-pointer  text-dark-500"
        />
      )}
      <SecondaryButton
        loading={searchJob.isLoading}
        disable={searchJob.isLoading}
        onClick={() => handleSearch()}
        className=" mr-1 h-full w-fit rounded-full  bg-darkGradient py-2  px-4 text-white"
      >
        Search
      </SecondaryButton>
      {searchedJobs?.length > 0 && searchInput ? (
        <div>
          <SearchDropDown searchedJobs={searchedJobs} />
        </div>
      ) : null}
    </motion.div>
  );
};

export default Search;

const SearchDropDown = ({ searchedJobs }: { searchedJobs: Job[] }) => {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={motionContainer}
      className=" absolute left-0 top-20 z-50 grid w-full gap-4 rounded-3xl bg-white p-4
     shadow-2xl shadow-accent-100"
    >
      {searchedJobs?.map((job: Job) => {
        return (
          <motion.li
            key={job.id}
            variants={motionItem}
            whileHover={{
              scale: 1.025,
            }}
            className=" grid items-center gap-2 rounded-3xl bg-light-100 p-4 shadow-2xl shadow-accent-100/50 hover:shadow-accent-100 md:grid-cols-[1fr_auto]"
          >
            <Link
              href={`/job/${job.id}`}
              className="grid  grid-cols-[auto_1fr] grid-rows-[3,auto] items-center gap-y-2 gap-x-4  "
            >
              <Image
                width={80}
                height={80}
                src={job.company.logo}
                alt={job.company.name}
                className=" h-full max-h-10 overflow-hidden  object-contain md:row-span-3 md:max-h-20"
              />

              <h2 className="font-medium capitalize line-clamp-2">
                {job.title.toLowerCase()}
              </h2>

              <div className=" col-span-2 my-2 flex flex-wrap gap-2 md:col-span-1">
                <p className="flex h-full  max-h-6 w-fit items-center rounded-full bg-dark-500 py-1 px-4  text-xs capitalize text-gray-100">
                  <TimeAgoComponent createdAt={job.createdAt} />
                </p>
                <p className="flex  h-full max-h-6 w-fit items-center rounded-full bg-dark-100 py-1 px-4  text-xs capitalize text-gray-800">
                  {job.type.replaceAll("_", " ").toLowerCase()}
                </p>
                <p
                  className={` hidden h-full max-h-6 w-fit rounded-full bg-dark-100 px-4 py-1 text-xs capitalize text-gray-700 sm:block ${
                    job.workPlace === "REMOTE" ? " bg-green-300" : ""
                  }`}
                >
                  {job.workPlace.replaceAll("_", " ").toLowerCase()}
                </p>
              </div>
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};
