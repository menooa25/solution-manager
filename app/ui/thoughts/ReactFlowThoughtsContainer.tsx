"use client";
import { useContext, useMemo } from "react";
import ReactFlow, { Background, BackgroundVariant, Controls } from "reactflow";
import { ThoughtNodeContext } from "./ThoughtsNodeProvider";
import Thought from "./singleThought/Thought";

const ReactFlowThoughtsContainer = () => {
  const { edges, onEdgesChange, nodes, onNodesChange } =
    useContext(ThoughtNodeContext);

  const nodeTypes = useMemo(
    () => ({
      thought: Thought,
    }),
    []
  );

  return (
    <div className="h-dvh w-dvw ">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edges={edges}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        fitView
        zoomOnDoubleClick
      >
        <Controls className="!mb-16 sm:!mb-4" />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowThoughtsContainer;
