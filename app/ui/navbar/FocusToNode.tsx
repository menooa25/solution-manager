"use client";

import { useContext } from "react";
import { RiFocus3Line } from "react-icons/ri";
import { ThoughtNodeContext } from "../thoughts/ThoughtsNodeProvider";

const FocusToNode = () => {
  const { locateMainNode } = useContext(ThoughtNodeContext);

  return (
    <button
      onClick={locateMainNode}
      className="btn btn-ghost btn-sm btn-circle hover:!bg-transparent"
    >
      <RiFocus3Line size={50} />
    </button>
  );
};

export default FocusToNode;
