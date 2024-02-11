"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  id: string;
}
const Modal = ({ id, children }: Props) => {
  return (
    <dialog
      id={id}
      className="modal modal-bottom  sm:modal-middle p-0 sm:py-1 sm:px-3 rounded-none sm:rounded-lg "
    >
      <div className="modal-box ">{children}</div>
      <form
        method="dialog"
        className="modal-backdrop w-dvw h-dvh sm:w-auto sm:h-auto "
      >
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
