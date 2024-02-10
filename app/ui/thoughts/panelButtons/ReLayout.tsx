"use client";

import { FiLayout } from "react-icons/fi";
const ReLayout = () => {
  return (
    <div
      onClick={() => {
        window.location.reload();
      }}
    >
      <button className="sm:hidden btn btn-xs p-0 btn-ghost">
        <FiLayout size={30} />
      </button>
      <button className="hidden sm:block btn btn-xs">مرتب سازی</button>
    </div>
  );
};

export default ReLayout;
