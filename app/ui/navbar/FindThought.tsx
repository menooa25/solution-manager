"use client";

import useModal from "@/app/hooks/useModal";
import Modal from "@/app/ui/Modal";
import SearchThought from "../thoughts/searchThought/SearchThought";
import { IoMdSearch } from "react-icons/io";
import { useContext } from "react";
import { ThoughtNodeContext } from "../thoughts/ThoughtsNodeProvider";
import useLocateNodeInIDChange from "@/app/hooks/thoughts/useLocateAfterIDChange";
import { Thought } from "@prisma/client";

const FindThought = () => {
  const { openModal, closeModal, modalId } = useModal();
  const { fetchIssues } = useContext(ThoughtNodeContext);
  const { setAddedNodeId } = useLocateNodeInIDChange();

  const onSubmit = async (thought: Thought) => {
    const {id} = thought
    closeModal();
    await fetchIssues(id);
    setAddedNodeId(id.toString());
  };

  return (
    <>
      <button
        onClick={openModal}
        className="btn btn-ghost btn-sm btn-circle hover:!bg-transparent"
      >
        <IoMdSearch size={30} />
      </button>
      <Modal id={modalId}>
        <SearchThought callBackFunc={onSubmit} />
      </Modal>
    </>
  );
};

export default FindThought;
