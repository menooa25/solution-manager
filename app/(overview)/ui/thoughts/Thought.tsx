"use client";
import { Thought as ThoughtType } from "@prisma/client";
import { Handle, NodeToolbar, Position } from "reactflow";
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
      <Handle
        position={Position.Top}
        className="!bg-transparent  !top-[1px] !border-none"
        type="target"
      />
      <button className="btn  btn-xs">{data.description}</button>
      <Handle
        className="!bg-transparent  !bottom-[1px] !border-none"
        position={Position.Bottom}
        type="source"
      />
    </div>
  );
};

export default Thought;
