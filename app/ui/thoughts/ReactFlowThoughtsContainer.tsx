"use client";
import { useContext, useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
} from "reactflow";
import { ThoughtContext } from "./ReactFlowThoughtsProvider";
import PanelButtonsContainer from "./panelButtons/PanelButtonsContainer";
import Thought from "./singleThought/Thought";

const ReactFlowThoughtsContainer = () => {
  const { edges, onEdgesChange, nodes, onNodesChange } =
    useContext(ThoughtContext);

  const nodeTypes = useMemo(
    () => ({
      thought: Thought,
    }),
    []
  );

  return (
    <div className="h-screen w-screen ">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edges={edges}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        fitView
        onlyRenderVisibleElements
        zoomOnDoubleClick
      >
        <Controls className="!mb-16 sm:!mb-4" />
        <Background variant={BackgroundVariant.Dots} />
        <Panel className="w-full !m-0" position={"top-center"}>
          <PanelButtonsContainer />
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default ReactFlowThoughtsContainer;
