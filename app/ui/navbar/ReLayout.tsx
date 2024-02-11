"use client";

import { FiLayout } from "react-icons/fi";
const ReLayout = () => {
  return (
    <div
      onClick={() => {
        window.location.reload();
      }}
    >
      <button className=" btn btn-xs  btn-ghost p-0 hover:bg-transparent">
        <FiLayout size={30} />
      </button>
    </div>
  );
};

export default ReLayout;
