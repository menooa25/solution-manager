"use client";
import { IoMdAdd } from "react-icons/io";

import useModal from "@/app/hooks/useModal";
import Modal from "@/app/ui/Modal";
import { useContext, useState } from "react";
import CreateNewThoughtForm from "./CreateNewThoughtForm";
import SearchThought from "../../searchThought/SearchThought";
import { createRelatedThought } from "@/app/lib/thoughts/actions";
import { Thought } from "@prisma/client";
import { direction } from "direction";
import useLocateNodeInIDChange from "@/app/hooks/thoughts/useLocateAfterIDChange";
import { ThoughtNodeContext } from "../../ThoughtsNodeProvider";

type Inputs = {
  description: string;
  mood: string;
};
interface Props {
  type: "issue" | "solution";
  id: number;
  currentThoughtDescription: string;
}

const AddRelatedThought = ({ type, id, currentThoughtDescription }: Props) => {
  const { modalId, openModal, closeModal } = useModal();
  const { setAddedNodeId } = useLocateNodeInIDChange();
  const { fetchIssues } = useContext(ThoughtNodeContext);
  const [createNewOne, setCreateNewOne] = useState(true);
  const onSubmitFromExistedThought = async (thought: Thought) => {
    await createRelatedThought(
      id,
      type === "issue",
      thought.description,
      thought.feelGood,
      type
    );
    closeModal();
    await fetchIssues(id);
    setAddedNodeId(id.toString());
  };
  return (
    <>
      <button
        onClick={openModal}
        className="btn btn-xs btn-primary font-bold text-sm flex items-center"
      >
        {type === "issue" ? "مسله" : "راه حل"}
        <IoMdAdd className="-mx-2 " size={20} />
      </button>
      <Modal id={modalId}>
        <div role="tablist" className="tabs tabs-boxed">
          <a
            onClick={() => setCreateNewOne(false)}
            role="tab"
            className={`tab ${!createNewOne && "tab-active"} `}
          >
            <span>های موجود</span>
            <span>&nbsp;{type === "issue" ? "مسله" : "راه حل"}&nbsp;</span>
            <span>انتخاب از</span>
          </a>
          <a
            onClick={() => setCreateNewOne(true)}
            role="tab"
            className={`tab ${createNewOne && "tab-active"} `}
          >
            <span>جدید</span>
            <span>&nbsp;{type === "issue" ? "مسله" : "راه حل"}&nbsp;</span>
            <span>ایحاد</span>
          </a>
        </div>
        <span
          dir={direction(currentThoughtDescription)}
          className="block text-center font-bold mt-2"
        >
          {currentThoughtDescription}
        </span>
        {createNewOne && (
          <CreateNewThoughtForm
            id={id}
            onSubmited={closeModal}
            type={type}
          />
        )}
        {!createNewOne && (
          <SearchThought callBackFunc={onSubmitFromExistedThought} />
        )}
      </Modal>
    </>
  );
};

export default AddRelatedThought;
