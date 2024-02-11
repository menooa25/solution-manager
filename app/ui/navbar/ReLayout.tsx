"use client";

import { FiLayout } from "react-icons/fi";
const ReLayout = () => {
  return (
    <button
      onClick={() => {
        window.location.reload();
      }}
      className="btn btn-ghost btn-sm btn-circle hover:!bg-transparent"
    >
      <FiLayout size={30} />
    </button>
  );
};

export default ReLayout;
