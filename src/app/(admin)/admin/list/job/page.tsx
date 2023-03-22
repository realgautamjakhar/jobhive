"use client";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { api } from "~/utils/api";
import * as Yup from "yup";
import { TextInput } from "~/components/input/TextInput";
import PrimaryButton from "~/components/button/PrimaryButton";
import { JobType, WorkPlace } from "@prisma/client";
import RichTextEditor from "~/components/input/RichTextEditor";
import Loader from "~/components/Loader";
import { toast } from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";
import { useSession } from "next-auth/react";

interface Values {
  title: string;
  desc: string;
  type: JobType;
  education: string;
  role: string;
  salary: number;
  experienceMin: number;
  experienceMax: number;
  workPlace: WorkPlace;
  location: string;
  companyId: string;
  categoryId: string;
  subCategoryId: string;
  featured: boolean;
  approved: boolean;
}

const DisplayingErrorMessagesSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  education: Yup.string()
    .required("Required")
    .min(2, "Too Short!")
    .max(20, "Too Long!"),
  role: Yup.string().required("Required"),
  salary: Yup.number().min(0, "Salary can be negative ???"),
  type: Yup.string().required("Required"),
});

const JobListPage = () => {
  const { data: session } = useSession();

  const listJob = api.job.create.useMutation({
    onSuccess: () => {
      toast.success("Job Listed Successfully");
    },
    onError: (e) => {
      toast.error(`Something went wrong  ${e.message}`);
    },
  });

  const { data: companies, isLoading: isCompaniesLoading } =
    api.company.getAll.useQuery(undefined, {});
  const { data: categories, isLoading: isCategoriesLoading } =
    api.category.getAll.useQuery(undefined, {});
  const { data: subCategories, isLoading: isSubCategoriesLoading } =
    api.subCategory.getAll.useQuery(undefined, {});
  const [desc, setDesc] = useState<string>(
    "Job Listing Description Such as Skills role responsibility"
  );
  const [applyInstruction, setApplyInstruction] = useState<string>(
    "Any special apply instruction "
  );
  // if (isCompaniesLoading || isCategoriesLoading || isSubCategoriesLoading) {
  //   return <Loader />;
  // }
  return (
    <main className=" mx-auto w-full max-w-7xl px-4">
      <h2 className=" py-4 text-[clamp(1rem,6vw,2rem)] font-medium capitalize">
        List New Job
      </h2>
      <Formik
        initialValues={{
          title: "",
          desc: "",
          type: "REMOTE",
          education: "",
          role: "",
          experienceMin: 0,
          experienceMax: 0,
          salary: 0,
          workPlace: "REMOTE",
          location: "",
          categoryId: categories?.length > 0 ? categories[0].id : "",
          subCategoryId: subCategories?.length > 0 ? subCategories[0].id : "",
          companyId: companies?.length > 0 ? companies[0].id : "",
          featured: false,
          approved: false,
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values: Values) => {
          // if(!desc) return toast.error("Please provide job description")
          void listJob.mutate({
            title: values.title,
            desc: desc,
            type: values.type,
            education: values.education,
            role: values.role,
            experienceMin: values.experienceMin,
            experienceMax: values.experienceMax,
            salary: values.salary,
            workPlace: values.workPlace,
            location: values.location,
            companyId: values.companyId,
            categoryId: values.categoryId,
            subCategoryId: values.subCategoryId,
            approved: values.approved,
            featured: values.featured,
            userId: session.user.id,
          });
        }}
      >
        {({ values }) => (
          <Form className="grid gap-6 md:grid-cols-2">
            <div className=" grid h-fit gap-4">
              <Field
                component={TextInput}
                name="title"
                id="title"
                title="title"
                placeholder="Job Title"
              />

              <RichTextEditor
                value={desc}
                onChange={setDesc}
                title="Job Description"
              />

              {companies && (
                <div className=" relative cursor-pointer">
                  <h2 className=" pb-1  text-xs capitalize text-gray-600 dark:text-gray-100">
                    Select Company *
                  </h2>
                  <Field
                    as="select"
                    name="companyId"
                    className={`w-full rounded-md bg-white py-2 pl-4 text-base font-normal text-gray-900 ring-1 ring-gray-500 ring-opacity-25 placeholder:text-sm placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-accent-500 dark:text-gray-50 dark:ring-opacity-50`}
                  >
                    {companies?.map((company) => {
                      return (
                        <option
                          key={company.id}
                          value={company.id}
                          className=" capitalize"
                        >
                          {company.name}
                        </option>
                      );
                    })}
                  </Field>
                  <FiChevronDown
                    size={24}
                    className="  absolute inset-y-0 -bottom-6  right-2 z-50 my-auto  text-accent-500 transition-all duration-300 ease-in-out group-hover:text-accent-500"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {categories && (
                  <div className=" relative">
                    <h2 className=" pb-1  text-xs capitalize text-gray-600 dark:text-gray-100">
                      Job Department *
                    </h2>
                    <Field
                      as="select"
                      name="categoryId"
                      className={`w-full rounded-md bg-white py-2 pl-4 text-base font-normal text-gray-900 ring-1 ring-gray-500 ring-opacity-25 placeholder:text-sm placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-accent-500 dark:text-gray-50 dark:ring-opacity-50`}
                    >
                      {categories?.map((category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </Field>
                    <FiChevronDown
                      size={24}
                      className="  absolute inset-y-0 -bottom-6  right-2 z-50 my-auto  text-accent-500 transition-all duration-300 ease-in-out group-hover:text-accent-500"
                    />
                  </div>
                )}
                {subCategories && (
                  <div className=" relative">
                    <h2 className=" pb-1  text-xs capitalize text-gray-600 dark:text-gray-100">
                      Job Role *
                    </h2>
                    <Field
                      as="select"
                      name="subCategoryId"
                      className={`w-full rounded-md bg-white py-2 pl-4 text-base font-normal text-gray-900 ring-1 ring-gray-500 ring-opacity-25 placeholder:text-sm placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-accent-500 dark:text-gray-50 dark:ring-opacity-50`}
                    >
                      {subCategories.map((category) => {
                        return (
                          <option
                            className=" capitalize"
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </option>
                        );
                      })}
                    </Field>{" "}
                    <FiChevronDown
                      size={24}
                      className="  absolute inset-y-0 -bottom-6  right-2 z-50 my-auto  text-accent-500 transition-all duration-300 ease-in-out group-hover:text-accent-500"
                    />
                  </div>
                )}
              </div>
              <Field
                component={TextInput}
                name="education"
                id="education"
                title="education"
                placeholder="Any / Btech / MCA"
              />
              <Field
                component={TextInput}
                name="role"
                id="role"
                title="role"
                placeholder="SDE 1 ~ / Web Developer / Driver 🫥 "
              />
            </div>

            <div className=" grid items-start gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className=" relative">
                  <h2 className=" pb-1  text-xs capitalize text-gray-600 dark:text-gray-100">
                    Employment / Job Type *
                  </h2>
                  <Field
                    as="select"
                    name="type"
                    className={`w-full rounded-md bg-white py-2 pl-4 text-base font-normal text-gray-900 ring-1 ring-gray-500 ring-opacity-25 placeholder:text-sm placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-accent-500 dark:text-gray-50 dark:ring-opacity-50`}
                  >
                    {Object.keys(JobType).map((key) => {
                      return (
                        <option
                          key={key}
                          value={JobType[key]}
                          className="capitalize"
                        >
                          {key.replace("_", " ")}
                        </option>
                      );
                    })}
                  </Field>
                  <FiChevronDown
                    size={24}
                    className="  absolute inset-y-0 -bottom-4  right-2 z-50 my-auto  text-accent-500 transition-all duration-300 ease-in-out group-hover:text-accent-500"
                  />
                </div>{" "}
                <Field
                  component={TextInput}
                  name="salary"
                  id="salary"
                  title="Salary LPA"
                  type="number"
                  placeholder="Salary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  component={TextInput}
                  name="experienceMin"
                  id="experienceMin"
                  title="experience Min"
                  type="number"
                  placeholder="0 | > 0"
                />

                <Field
                  component={TextInput}
                  name="experienceMax"
                  id="experienceMax"
                  title="experience Max"
                  type="number"
                  placeholder="Maximum experience"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className=" relative">
                  <h2 className=" pb-1  text-xs capitalize text-gray-600 dark:text-gray-100">
                    Working Place
                  </h2>
                  <Field
                    as="select"
                    name="workPlace"
                    className={`w-full cursor-pointer rounded-md bg-white py-2 pl-4 text-base font-normal text-gray-900 ring-1 ring-gray-500 ring-opacity-25 placeholder:text-sm placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-accent-500 dark:text-gray-50 dark:ring-opacity-50`}
                  >
                    {Object.keys(WorkPlace).map((key) => {
                      return (
                        <option
                          key={key}
                          value={WorkPlace[key]}
                          className="capitalize"
                        >
                          {key.replace("_", " ")}
                        </option>
                      );
                    })}
                  </Field>
                  <FiChevronDown
                    size={24}
                    className="  absolute inset-y-0 -bottom-6  right-2 z-50 my-auto  text-accent-500 transition-all duration-300 ease-in-out group-hover:text-accent-500"
                  />
                </div>
                {values.workPlace === "HYBRID" ||
                values.workPlace === "OFFICE" ? (
                  <Field
                    component={TextInput}
                    name="location"
                    id="location"
                    title="location"
                    placeholder="location"
                  />
                ) : null}
              </div>
              <Field
                component={TextInput}
                name="applyUrl"
                id="applyUrl"
                title="Apply Url"
                placeholder="https://company.com/jobid"
              />
              <Field
                component={TextInput}
                name="applyEmail"
                id="applyEmail"
                title="Apply Email"
                placeholder="Apply Email if any"
              />
              <RichTextEditor
                value={applyInstruction}
                title="Apply Instruction (if any)"
                onChange={setApplyInstruction}
              />
              <div className="  grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="featured"
                    className="addon-checkbox mt-5 bg-white"
                  >
                    <Field type="checkbox" id="featured" name="featured" />
                    <div className="custom-checkbox" />
                    <div className="checkbox-content flex">
                      <p className="text-sm  font-bold capitalize text-accent-500">
                        featured
                      </p>
                    </div>
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="approved"
                    className="addon-checkbox mt-5 bg-white"
                  >
                    <Field type="checkbox" id="approved" name="approved" />
                    <div className="custom-checkbox" />
                    <div className="checkbox-content flex">
                      <p className="text-sm  font-bold capitalize text-green-400">
                        approved
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              <PrimaryButton className=" my-4 w-full" type="submit">
                List
              </PrimaryButton>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default api.withTRPC(JobListPage);
