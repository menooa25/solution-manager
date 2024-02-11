"use client";

import useModal from "@/app/hooks/useModal";
import Modal from "@/app/ui/Modal";
import SearchThought from "../thoughts/searchThought/SearchThought";
import { IoMdSearch } from "react-icons/io";

const FindThought = () => {
  const { openModal, closeModal, modalId } = useModal();
  return (
    <>
      <button
        onClick={openModal}
        className="btn btn-ghost btn-sm btn-circle hover:!bg-transparent"
      >
        <IoMdSearch size={30} />
      </button>
      <Modal id={modalId}>
        <SearchThought callBackFunc={closeModal} />
      </Modal>
    </>
  );
};

export default FindThought;
