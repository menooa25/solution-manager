import { Handle, Position } from "reactflow";

const Thought = () => {
  return (
    <div>
      <Handle id="22-t" position={Position.Top} type="target" />
      <button className="btn btn-xs">im button</button>
      <Handle id="22-s" position={Position.Bottom} type="source" />
    </div>
  );
};

export default Thought;
