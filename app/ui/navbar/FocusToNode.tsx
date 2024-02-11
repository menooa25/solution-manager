"use client";

import { useReactFlow } from "reactflow";
import { RiFocus3Line } from "react-icons/ri";

const FocusToNode = () => {
  const { setViewport, zoomIn, zoomOut } = useReactFlow();
  return (
    <button className="btn btn-ghost btn-sm btn-circle hover:!bg-transparent">
      <RiFocus3Line size={50} />
    </button>
  );
};

export default FocusToNode;
