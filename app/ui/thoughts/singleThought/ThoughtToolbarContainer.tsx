"use client";

import { NodeToolbar, Position } from "reactflow";
import AddRelatedThought from "../tooltip/AddRelatedThought";
import LocateCloseThoughts from "../tooltip/LocateCloseThoughts";
import RemoveThought from "../tooltip/RemoveThought";
import { Thought } from "@prisma/client";

const ThoughtToolbarContainer = ({ data }: { data: Thought }) => {
  return (
    <>
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
          <RemoveThought description={data.description} id={data.id} />
        </div>
      </NodeToolbar>
    </>
  );
};

export default ThoughtToolbarContainer;
