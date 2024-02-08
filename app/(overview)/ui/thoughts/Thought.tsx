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
  console.log(data);
  return (
    <div>
      <Handle position={Position.Top} type="target" />
      <button className="btn btn-xs">{data.description}</button>
      <Handle position={Position.Bottom} type="source" />
    </div>
  );
};

export default Thought;
