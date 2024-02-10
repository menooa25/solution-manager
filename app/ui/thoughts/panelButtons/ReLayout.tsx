"use client";

import { useContext } from "react";
import { ThoughtContext } from "../ReactFlowThoughtsProvider";
import { useReactFlow } from "reactflow";
import { FiLayout } from "react-icons/fi";
const ReLayout = () => {
  const { reLayout } = useContext(ThoughtContext);
  const { fitView } = useReactFlow();

  return (
    <div
      onClick={() => {
        reLayout();
        fitView();
      }}
    >
      <FiLayout size={30} className="sm:hidden" />
      <button className="hidden sm:block btn btn-xs">مرتب سازی</button>
    </div>
  );
};

export default ReLayout;
