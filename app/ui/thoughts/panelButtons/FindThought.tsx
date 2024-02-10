"use client";

import useModal from "@/app/hooks/useModal";
import Modal from "@/app/ui/Modal";
import SearchThought from "../searchThought/SearchThought";

const FindThought = () => {
  const { openModal, closeModal, modalId } = useModal();
  return (
    <>
      <button
        onClick={openModal}
        className="btn btn-ghost btn-xs sm:btn sm:btn-xs"
      >
        جستجو
      </button>
      <Modal id={modalId}>
        <div>
          <SearchThought callBackFunc={closeModal} />
        </div>
      </Modal>
    </>
  );
};

export default FindThought;
