"use client";

import { renameThought } from "@/app/lib/thoughts/actions";
import { Thought } from "@prisma/client";
import { direction } from "direction";
import { useContext, useState } from "react";
import { ThoughtNodeContext } from "./ThoughtsNodeProvider";
interface Props {
  thought: Thought;
  onClose: () => void;
}
const RenameThought = ({ thought, onClose }: Props) => {
  const [text, setText] = useState(thought.description);
  const { mainNodeId, fetchIssues } = useContext(ThoughtNodeContext);
  const onSubmit = async () => {
    if (text !== thought.description) {
      await renameThought(+thought.id, text);
    }

    onClose();
    fetchIssues(+mainNodeId);
  };
  return (
    <>
      <input
        autoFocus
        onBlur={onSubmit}
        dir={direction(text)}
        value={text}
        onChange={({ target: { value } }) => setText(value)}
        className="input input-bordered input-xs focus-visible:outline-none w-full max-w-xs"
      />
    </>
  );
};

export default RenameThought;
