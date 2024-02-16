"use client";

import useModal from "@/app/hooks/useModal";
import { deleteRelation } from "@/app/lib/thoughts/actions";
import Modal from "@/app/ui/Modal";
import { useContext, useState } from "react";
import { Node } from "reactflow";
import { ThoughtNodeContext } from "../../ThoughtsNodeProvider";
import Loading from "@/app/ui/Loading";

interface Props {
  target: string;
  source: string;
}
const DeleteForm = ({ target, source }: Props) => {
  const [loading, setLoading] = useState(false);
  const { modalId, openModal, closeModal } = useModal();
  const { nodes, fetchIssues, mainNodeId } = useContext(ThoughtNodeContext);
  const [engageNodes, setEngageNodes] = useState<Node[]>([]);

  const onSubmit = async () => {
    setLoading(true);
    await deleteRelation(+source, +target);
    await fetchIssues(+mainNodeId);
    closeModal();
    setLoading(false);
  };
  const onOpenClick = () => {
    const [firstNode, secondNode] = nodes.filter(({ id }) =>
      [target, source].includes(id)
    );
    setEngageNodes([firstNode, secondNode]);
    openModal();
  };
  return (
    <>
      <button
        className="btn btn-circle btn-xs p-0 flex justify-center items-center leading-[6px]  h-3 min-h-3 w-3"
        onClick={onOpenClick}
      >
        ×
      </button>
      <Modal id={modalId}>
        <div className="flex flex-col items-center">
          <span>آیا مایل به حذف ارتباط بین</span>
          <div className="flex gap-x-1 font-bold">
            <span>{engageNodes[0]?.data?.description}</span>
            <span className="font-normal">و</span>
            <span>{engageNodes[1]?.data?.description}</span>
          </div>
          <span>هستید؟</span>
          <div className="flex gap-x-2 justify-center mt-3 w-full">
            <button className="btn btn-sm  w-2/5">خیر</button>
            <button
              disabled={loading}
              onClick={onSubmit}
              className="btn btn-sm btn-neutral  w-2/5"
            >
              بله
              <Loading condition={loading} />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteForm;
