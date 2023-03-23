"use client";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import * as Yup from "yup";
import { TextInput } from "~/components/input/TextInput";
import PrimaryButton from "~/components/button/PrimaryButton";
import { JobType, WorkPlace } from "@prisma/client";
import RichTextEditor from "~/components/input/RichTextEditor";
import Loader from "~/components/Loader";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
type Params = {
  params: {
    id: string;
  };
};

interface Values {
  title: string;
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
  type: Yup.string().required("Required"),
  education: Yup.string().required("Required"),
});
const EditJobPage = ({ params: { id } }: Params) => {
  const { data: session } = useSession();
  const { data: job, isLoading } = api.job.get.useQuery({ id });
  const updateAdminJob = api.job.updateAdminJob.useMutation({
    onSuccess: () => {
      toast.success("Job updated Successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const { data: companies, isLoading: isCompaniesLoading } =
    api.company.getAll.useQuery(undefined, {});
  const { data: categories, isLoading: isCategoriesLoading } =
    api.category.getAll.useQuery(undefined, {});
  const { data: subCategories, isLoading: isSubCategoriesLoading } =
    api.subCategory.getAll.useQuery(undefined, {});

  const [desc, setDesc] = useState<string>();
  const [applyInstruction, setApplyInstruction] = useState<string>();

  useEffect(() => {
    if (job && !isLoading) {
      setDesc(job.desc);
      setApplyInstruction(job.applyInstruction);
    }
  }, [job, isLoading]);

  if (
    isCompaniesLoading ||
    isCategoriesLoading ||
    isSubCategoriesLoading ||
    isLoading
  ) {
    return <Loader />;
  }

  return (
    <main className=" mx-auto w-full max-w-7xl px-4">
      <h2 className=" py-4 text-[clamp(1rem,6vw,2rem)] font-medium capitalize">
        Edit Job Page
      </h2>
      <Formik
        initialValues={{
          title: job.title,
          type: job.type,
          education: job.education,
          role: job.role,
          experienceMin: job.experienceMin,
          experienceMax: job.experienceMax,
          salary: job.salary,
          workPlace: job.workPlace,
          location: job.location,
          categoryId: job.categoryId,
          subCategoryId: job.subCategoryId,
          companyId: job.companyId,
          featured: job.featured,
          approved: job.approved,
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values: Values) => {
          void updateAdminJob.mutate({
            id: job.id,
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
            userId: job.userId ? job.userId : session.user.id,
          });
        }}
      >
        {({ errors, touched, values }) => (
          <Form className="grid gap-6 md:grid-cols-2">
            <div className=" grid h-fit gap-4">
              <Field
                component={TextInput}
                name="title"
                id="title"
                title="title"
                placeholder="Job Title"
              />
              <div className=" pb-4">
                <h2 className="pb-1 pl-2 text-sm capitalize text-gray-900 dark:text-gray-100">
                  Job Description
                </h2>
                <RichTextEditor value={desc} onChange={setDesc} />
              </div>
              {companies && (
                <div>
                  <h2 className="pb-1 pl-2 text-sm capitalize text-gray-900 dark:text-gray-100">
                    Select Company for the list *
                  </h2>
                  <Field
                    as="select"
                    name="companyId"
                    className="w-full rounded-md  bg-transparent p-2 text-base font-normal capitalize  text-gray-900 ring-1  ring-accent-100 placeholder:text-gray-300 focus:outline-none focus:ring-opacity-50 dark:text-gray-50 dark:ring-opacity-50 "
                  >
                    <option key={1} value={undefined}>
                      Select
                    </option>
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
                </div>
              )}
              <Field
                component={TextInput}
                name="education"
                id="education"
                title="education"
                placeholder="BTech / MCA / any"
              />
              <Field
                component={TextInput}
                name="role"
                id="role"
                title="role"
                placeholder="SDE 1 ~ / Web Developer / Driver 🫥 "
              />
              <Field
                component={TextInput}
                name="industry"
                id="industry"
                title="industry"
                placeholder="Ecommerce / Logistics / Fintech / Edtech"
              />
              <Field
                component={TextInput}
                name="department"
                id="department"
                title="department"
                placeholder="Software Development / IT"
              />
            </div>
            <div className=" grid items-start gap-4">
              <div className="grid grid-cols-3 gap-4">
                <Field
                  component={TextInput}
                  name="salary"
                  id="salary"
                  title="salary (lpa)"
                  type="number"
                  placeholder="Salary (lpa)"
                />

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
                {categories && (
                  <div>
                    <h2 className="pb-1 pl-2 text-sm capitalize text-gray-900 dark:text-gray-100">
                      Select Company Field Category
                    </h2>
                    <Field
                      as="select"
                      name="categoryId"
                      className="w-full  rounded-md bg-transparent p-2 text-base font-normal  text-gray-900 ring-1  ring-accent-100 placeholder:text-gray-300 focus:outline-none focus:ring-opacity-50 dark:text-gray-50 dark:ring-opacity-50 "
                    >
                      <option key={1} value={undefined}>
                        Select One
                      </option>
                      {categories?.map((category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                )}
                {subCategories && (
                  <div>
                    <h2 className="pb-1 pl-2 text-sm capitalize text-gray-900 dark:text-gray-100">
                      Select Job Category
                    </h2>
                    <Field
                      as="select"
                      name="subCategoryId"
                      className="w-full rounded-md  bg-transparent p-2 text-base font-normal capitalize  text-gray-900 ring-1  ring-accent-100 placeholder:text-gray-300 focus:outline-none focus:ring-opacity-50 dark:text-gray-50 dark:ring-opacity-50 "
                    >
                      <option key={1} value={undefined}>
                        Select
                      </option>
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
                    </Field>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="pb-1 pl-2 text-sm capitalize text-gray-900 dark:text-gray-100">
                    Select Job Type
                  </h2>
                  <Field
                    as="select"
                    name="type"
                    className="w-full rounded-md  bg-transparent p-2 text-base font-normal capitalize  text-gray-900 ring-1  ring-accent-100 placeholder:text-gray-300 focus:outline-none focus:ring-opacity-50 dark:text-gray-50 dark:ring-opacity-50 "
                  >
                    <option key={1} value={undefined}>
                      Select
                    </option>
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
                </div>

                <div>
                  <h2 className="pb-1 pl-2 text-sm capitalize text-gray-900 dark:text-gray-100">
                    Select Working place for job
                  </h2>
                  <Field
                    as="select"
                    name="workPlace"
                    className="w-full rounded-md  bg-transparent p-2 text-base font-normal capitalize  text-gray-900 ring-1  ring-accent-100 placeholder:text-gray-300 focus:outline-none focus:ring-opacity-50 dark:text-gray-50 dark:ring-opacity-50 "
                  >
                    <option key={1} value={undefined}>
                      Select
                    </option>
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
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  component={TextInput}
                  name="location"
                  id="location"
                  title="location"
                  placeholder="location"
                />
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
              <div className=" pb-4">
                <h2 className="pb-1 pl-2 text-sm capitalize text-gray-900 dark:text-gray-100">
                  Apply Instruction if any
                </h2>
                <RichTextEditor
                  value={applyInstruction}
                  onChange={setApplyInstruction}
                />
              </div>
              <div className="  grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="featured" className="addon-checkbox mt-5">
                    <Field type="checkbox" id="featured" name="featured" />
                    <div className="custom-checkbox" />
                    <div className="checkbox-content flex">
                      <p className="text-marineblue  text-sm font-bold capitalize">
                        featured
                      </p>
                    </div>
                  </label>
                </div>
                <div>
                  <label htmlFor="approved" className="addon-checkbox mt-5">
                    <Field type="checkbox" id="approved" name="approved" />
                    <div className="custom-checkbox" />
                    <div className="checkbox-content flex">
                      <p className="text-marineblue  text-sm font-bold capitalize">
                        approved
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              <PrimaryButton
                loading={updateAdminJob.isLoading}
                disable={updateAdminJob.isLoading}
                className=" my-4 w-full"
                type="submit"
              >
                Update
              </PrimaryButton>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default api.withTRPC(EditJobPage);
