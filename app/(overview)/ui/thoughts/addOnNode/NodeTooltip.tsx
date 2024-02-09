"use client";

import { Thought } from "@prisma/client";
import { LuRadar } from "react-icons/lu";
import AddRelatedThought from "./AddRelatedThought";

interface Props {
  thought: Thought;
}
const NodeTooltip = ({ thought }: Props) => {
  return (
    <div className="flex flex-col items-end gap-y-1 ">
      <AddRelatedThought
        currentThoughtDescription={thought.description}
        id={thought.id}
        type="issue"
      />
      <AddRelatedThought
        currentThoughtDescription={thought.description}
        id={thought.id}
        type="solution"
      />
    </div>
  );
};

export default NodeTooltip;
