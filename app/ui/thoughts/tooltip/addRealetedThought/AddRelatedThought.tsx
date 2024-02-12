"use client";
import { IoMdAdd } from "react-icons/io";

import useModal from "@/app/hooks/useModal";
import Modal from "@/app/ui/Modal";
import { useState } from "react";
import CreateNewThoughtForm from "./CreateNewThoughtForm";

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

  const [createNewOne, setCreateNewOne] = useState(true);

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
        <CreateNewThoughtForm
          id={id}
          currentThoughtDescription={currentThoughtDescription}
          onSubmited={closeModal}
          type={type}
        />
      </Modal>
    </>
  );
};

export default AddRelatedThought;
