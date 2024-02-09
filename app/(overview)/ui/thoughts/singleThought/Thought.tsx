"use client";
import { Thought as ThoughtType } from "@prisma/client";
import clsx from "clsx";
import { useContext } from "react";
import { Handle, NodeToolbar, Position } from "reactflow";
import { ThoughtContext } from "../ReactFlowThoughtsProvider";
import AddRelatedThought from "../tooltip/AddRelatedThought";
import LocateCloseThoughts from "../tooltip/LocateCloseThoughts";
import RemoveThought from "../tooltip/RemoveThought";
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
        <div className="-mb-1">
          <AddRelatedThought
            currentThoughtDescription={data.description}
            id={data.id}
            type="issue"
          />
        </div>
      </NodeToolbar>
      <NodeToolbar position={Position.Bottom}>
        <div className="-mt-1">
          <AddRelatedThought
            currentThoughtDescription={data.description}
            id={data.id}
            type="solution"
          />
        </div>
      </NodeToolbar>
      <NodeToolbar position={Position.Right}>
        <div className="-ml-3">
          <LocateCloseThoughts id={data.id} />
        </div>
      </NodeToolbar>
      <NodeToolbar position={Position.Left}>
        <div className="-mr-3">
          <RemoveThought id={data.id} />
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
