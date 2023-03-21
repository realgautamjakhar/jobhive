import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import ConfirmModal from "~/components/modal/ConfirmModal";
import { api } from "~/utils/api";

const AdminJobCardControl = ({ jobId, refetch }) => {
  const { data: session } = useSession();
  if (!session?.user.isAdmin) return null;
  const deleteJob = api.job.deleteJob.useMutation({
    onSuccess: () => {
      toast.success("Deleted Successfully");
      refetch();
    },
    onError: () => {
      toast.error(`Something went wrong ${deleteJob?.error?.message}`);
    },
  });
  const handleDelete = () => {
    if (jobId)
      deleteJob.mutateAsync({
        id: jobId,
      });
  };

  return (
    <div className=" mt-4 ml-auto flex items-center gap-4">
      <Link title={`Edit page link for job`} href={`/admin/edit/job/${jobId}`}>
        <BiEdit
          size={22}
          className="text-accent-500 transition-all duration-300 ease-in-out hover:scale-110"
        />
      </Link>
      <ConfirmModal
        title="Delete"
        loading={deleteJob.isLoading}
        subTitle="You want to delete this job listing from our site ???"
        button={<AiOutlineDelete size={22} className="text-red-400" />}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminJobCardControl;
