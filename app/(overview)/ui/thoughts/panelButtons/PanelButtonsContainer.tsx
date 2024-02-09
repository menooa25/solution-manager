"use client";

import { useContext } from "react";
import AddThought from "./AddThought";
import { ThoughtContext } from "../ReactFlowThoughtsProvider";
import { useReactFlow } from "reactflow";
import FindThought from "./FindThought";

const PanelButtonsContainer = () => {
  const { reLayout } = useContext(ThoughtContext);
  const { fitView } = useReactFlow();

  return (
    <div className="flex justify-center gap-x-2 mt-2 ">
      <FindThought />
      <AddThought type="solution" />
      <AddThought type="issue" />
      <button
        onClick={() => {
          reLayout();
          fitView();
        }}
        className="btn btn-xs"
      >
        مرتب سازی
      </button>
    </div>
  );
};

export default PanelButtonsContainer;
