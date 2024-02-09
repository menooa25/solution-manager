"use client";
import { Thought as ThoughtType } from "@prisma/client";
import clsx from "clsx";
import { useContext, useState } from "react";
import { Handle, NodeToolbar, Position } from "reactflow";
import NodeTooltip from "../addOnNode/NodeTooltip";
import { ThoughtContext } from "../ReactFlowThoughtsProvider";
import { LuRadar } from "react-icons/lu";
import LocateCloseThoughts from "./LocateCloseThoughts";
interface Props {
  id: string;
  data: ThoughtType & {
    solutions?: ThoughtType[];
    issues?: ThoughtType[];
  };
}
const Thought = ({ data }: Props) => {
  const { mainNodeId } = useContext(ThoughtContext);
  const btnClass = clsx("btn btn-sm", {
    "!btn-neutral": +mainNodeId === data.id,
  });
  return (
    <div>
      <NodeToolbar>
        <NodeTooltip thought={data} />
      </NodeToolbar>
      <NodeToolbar position={Position.Right}>
        <div className="-ml-3">
          <LocateCloseThoughts id={data.id} />
        </div>
      </NodeToolbar>
      <Handle
        position={Position.Top}
        className="!bg-transparent  !-z-10 !top-[1px] !border-none"
        type="target"
      />
      <div>
        <button className={" " + btnClass}>{data.description}</button>
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
