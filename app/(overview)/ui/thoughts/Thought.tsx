"use client";
import { Thought as ThoughtType } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import { Handle, NodeToolbar, Position } from "reactflow";
import NodeTooltip from "./addOnNode/NodeTooltip";
interface Props {
  id: string;
  data: ThoughtType & {
    solutions?: ThoughtType[];
    issues?: ThoughtType[];
  };
}
const Thought = ({ data }: Props) => {
  return (
    <div>
      <NodeToolbar>
        <NodeTooltip thought={data} />
      </NodeToolbar>
      <Handle
        position={Position.Top}
        className="!bg-transparent  !-z-10 !top-[1px] !border-none"
        type="target"
      />
      <div>
        <button className="btn btn-sm">{data.description}</button>
      </div>
      <Handle
        className="!bg-transparent !-z-10 !bottom-[1px] !border-none"
        position={Position.Bottom}
        type="source"
      />
    </div>
  );
};

export default Thought;
