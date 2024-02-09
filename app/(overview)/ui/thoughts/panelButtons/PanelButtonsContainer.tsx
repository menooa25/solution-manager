"use client";

import { useContext } from "react";
import AddThought from "./AddThought";
import { ThoughtContext } from "../ReactFlowThoughtsProvider";

const PanelButtonsContainer = () => {
  const { reLayout } = useContext(ThoughtContext);
  return (
    <div className="flex justify-center gap-x-2 mt-2 ">
      <AddThought type="solution" />
      <AddThought type="issue" />
      <button onClick={reLayout} className="btn btn-sm">
        مرتب سازی
      </button>
    </div>
  );
};

export default PanelButtonsContainer;
