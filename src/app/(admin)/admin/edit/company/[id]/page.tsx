"use client";

import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { api } from "~/utils/api";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import PrimaryButton from "~/components/button/PrimaryButton";
import { TextInput } from "~/components/input/TextInput";
import ImageUpload from "~/components/input/ImageUpload";
import RichTextEditor from "~/components/input/RichTextEditor";

interface Values {
  name: string;
  website: string;
  linkedin: string;
}

const DisplayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  website: Yup.string().required("Required"),
  linkedin: Yup.string().required("Required"),
});

const EditCompanyPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const { data: company } = api.company.get.useQuery({
    id: id,
  });
  console.log(company);

  const editCompany = api.company.update.useMutation({
    onSuccess: () => {
      toast.success("Company Updated SuccessFully");
    },
    onError: (e) => {
      toast.error(`Something went Wrong ${e.message}`);
    },
  });
  const [desc, setDesc] = useState(company.desc);
  const [logo, setLogo] = useState(company.logo);
  return (
    <main className=" mx-auto w-full max-w-lg px-4 pb-16">
      <h2 className=" py-4 text-[clamp(1rem,6vw,2rem)] font-medium capitalize">
        List New Company
      </h2>
      <Formik
        initialValues={{
          name: company.name,
          website: company.website,
          linkedin: company.linkedin,
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values: Values) => {
          if (!logo) toast.error("Fills all the fields");
          if (logo) {
            void editCompany.mutate({
              id: company.id,
              name: values.name,
              desc: desc,
              logo: logo,
              website: values.website,
              linkedin: values.linkedin,
            });
          }
        }}
      >
        <Form className=" grid gap-2">
          <ImageUpload value={logo} onChange={(base64) => setLogo(base64)} />

          <Field
            component={TextInput}
            name="name"
            id="name"
            title="name"
            placeholder="Apple"
          />
          <div>
            <h2 className="pb-1 pl-2 text-sm capitalize text-gray-900 dark:text-gray-100">
              Company Description
            </h2>
            <RichTextEditor value={desc} onChange={setDesc} />
          </div>
          <Field
            component={TextInput}
            name="website"
            id="website"
            title="Company website"
            placeholder="Company website"
          />
          <Field
            component={TextInput}
            name="linkedin"
            id="linkedin"
            title="Company linkedin"
            placeholder="Company linkedin"
          />

          <PrimaryButton
            disable={editCompany.isLoading}
            loading={editCompany.isLoading}
            className="mt-4"
          >
            Edit / Update
          </PrimaryButton>
        </Form>
      </Formik>
    </main>
  );
};

export default api.withTRPC(EditCompanyPage);
