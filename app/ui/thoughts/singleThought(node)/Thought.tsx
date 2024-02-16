"use client";
import { Thought as ThoughtType } from "@prisma/client";
import clsx from "clsx";
import { useContext, useState } from "react";
import { Handle, NodeToolbar, Position } from "reactflow";
import { ThoughtNodeContext } from "../ThoughtsNodeProvider";
import AddRelatedThought from "../tooltip/addRealetedThought/AddRelatedThought";
import LocateCloseThoughts from "../tooltip/LocateCloseThoughts";
import RemoveThought from "../tooltip/RemoveThought";
import ThoughtToolbarContainer from "./ThoughtToolbarContainer";
import RenameThought from "../RenameThought";
interface Props {
  id: string;
  data: ThoughtType & {
    solutions?: ThoughtType[];
    issues?: ThoughtType[];
  };
}
const Thought = ({ data }: Props) => {
  const { mainNodeId } = useContext(ThoughtNodeContext);
  const [onRename, setOnRename] = useState(false);

  const btnClass = clsx("btn btn-sm", {
    "!btn-neutral": +mainNodeId === data.id,
  });

  return (
    <div>
      {!onRename && <ThoughtToolbarContainer data={data} />}
      <Handle
        position={Position.Top}
        className="!bg-transparent  !-z-10 !top-[1px] !border-none"
        type="target"
      />
      {onRename && (
        <RenameThought onClose={() => setOnRename(false)} thought={data} />
      )}
      {!onRename && (
        <button
          onDoubleClick={() => setOnRename(true)}
          className={" " + btnClass}
        >
          {data.description}
        </button>
      )}
      <Handle
        className="!bg-transparent !-z-10 !bottom-[1px] !border-none"
        position={Position.Bottom}
        type="source"
      />
    </div>
  );
};

export default Thought;
