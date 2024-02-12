"use client";

import { useContext } from "react";
import { FiLayout } from "react-icons/fi";
import { ThoughtNodeContext } from "../thoughts/ThoughtsNodeProvider";
const ReLayout = () => {
  const { reLayout } = useContext(ThoughtNodeContext);
  return (
    <button
      onClick={() => {
        reLayout();
      }}
      className="btn btn-ghost btn-sm btn-circle hover:!bg-transparent"
    >
      <FiLayout size={30} />
    </button>
  );
};

export default ReLayout;
