"use client";

import AddThought from "./AddThought";

const PanelButtonsContainer = () => {
  return (
    <div className="flex justify-center gap-x-2 mt-2 ">
      <AddThought type="solution" />
      <AddThought type="issue" />
    </div>
  );
};

export default PanelButtonsContainer;
