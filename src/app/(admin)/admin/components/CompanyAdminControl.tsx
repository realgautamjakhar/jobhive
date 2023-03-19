"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import PrimaryButton from "~/components/button/PrimaryButton";
import { api } from "~/utils/api";

const CompanyAdminControl = ({ companyId }) => {
  const { data: session } = useSession();
  const { data: company, isLoading: isCompanyLoading } =
    api.company.get.useQuery(
      { id: companyId },
      {
        enabled: session?.user.isAdmin,
      }
    );
  if (!session?.user.isAdmin) {
    return null;
  }
  return (
    <div className=" absolute inset-y-0 right-4 my-auto flex  h-fit flex-col gap-2">
      <PrimaryButton>
        <BiEdit size={24} />
      </PrimaryButton>
      <PrimaryButton>
        <AiOutlineDelete size={24} />
      </PrimaryButton>
    </div>
  );
};

export default CompanyAdminControl;
