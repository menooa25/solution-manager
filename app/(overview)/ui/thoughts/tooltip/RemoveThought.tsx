"use client";
import { deleteThought } from "@/app/(overview)/lib/actions";
import useModal from "@/app/hooks/useModal";
import Modal from "@/app/ui/Modal";
import { useContext, useState } from "react";
import { TbTrashX } from "react-icons/tb";
import { ThoughtContext } from "../ReactFlowThoughtsProvider";
interface Props {
  id: number;
  description: string;
}

const RemoveThought = ({ id, description }: Props) => {
  const { openModal, modalId, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const { fetchIssues } = useContext(ThoughtContext);
  const onDelete = async () => {
    setLoading(true);
    await deleteThought(id);
    const lastFetchId = +(localStorage.getItem("lastFetchId") ?? "");
    if (lastFetchId) {
      fetchIssues(lastFetchId);
      closeModal();
    }
    setLoading(false);
  };
  return (
    <>
      <button
        onClick={openModal}
        className="btn btn-circle btn-ghost text-error flex justify-center items-center p-1 btn-sm !h-full "
      >
        <TbTrashX size={25} />
      </button>
      <Modal id={modalId}>
        <div dir="rtl">
          <span>آیا مایل به حذف</span>
          <span className="font-bold">&nbsp;{description}&nbsp;</span>
          <span>هستید ؟</span>
        </div>
        <div className="flex justify-around mt-3 ">
          <button
            onClick={closeModal}
            className="btn btn-primary btn-sm w-28 sm:w-56"
          >
            خیر
          </button>
          <button
            disabled={loading}
            onClick={onDelete}
            className="btn btn-neutral btn-sm w-28 sm:w-56"
          >
            بله
            {loading && <span className="loading loading-sm loading-spinner" />}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default RemoveThought;
