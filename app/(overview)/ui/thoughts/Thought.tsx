"use client";
import { Handle, Position } from "reactflow";
interface Props {
  id: string;
  data: {
    label: string;
  };
}
// const Thought = (props) => {
const Thought = ({ id, data: { label } }: Props) => {
  return (
    <div>
      <Handle className="h-0 w-0" position={Position.Top} type="target" />
      <button className="btn btn-xs">{label}</button>
      <Handle position={Position.Bottom} type="source" />
    </div>
  );
};

export default Thought;
