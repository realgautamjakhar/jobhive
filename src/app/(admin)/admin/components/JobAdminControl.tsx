"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import PrimaryButton from "~/components/button/PrimaryButton";
import { api } from "~/utils/api";

const JobAdminControl = ({ jobId }) => {
  const { data: session } = useSession();
  const { data: job, isLoading: isJobLoading } = api.job.get.useQuery(
    { id: jobId },
    {
      enabled: session?.user.isAdmin,
    }
  );
  if (!session?.user.isAdmin) {
    return null;
  }
  return (
    <div className=" absolute inset-y-0 right-4 my-auto flex  h-fit flex-col gap-2">
      {/* <PrimaryButton
        disable={deleteJob.isLoading}
        loading={deleteJob.isLoading}
        onClick={() => {
          void deleteJob.mutateAsync({
            id: jobId,
          });
        }}
      >
        <AiOutlineDelete size={24} />
      </PrimaryButton> */}
      <a href={`/admin/edit/job/${jobId}`}>
        <PrimaryButton>
          <BiEdit size={24} />
        </PrimaryButton>
      </a>
    </div>
  );
};

export default JobAdminControl;
