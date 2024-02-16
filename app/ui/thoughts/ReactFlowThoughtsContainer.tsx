"use client";
import { useContext, useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  EdgeTypes,
  MiniMap,
} from "reactflow";
import { ThoughtNodeContext } from "./ThoughtsNodeProvider";
import Thought from "./singleThought(node)/Thought";
import ThoughtEdge from "./singleThought(node)/edge/ThoughtEdge";

const ReactFlowThoughtsContainer = () => {
  const { edges, onEdgesChange, nodes, onNodesChange } =
    useContext(ThoughtNodeContext);

  const nodeTypes = useMemo(
    () => ({
      thought: Thought,
    }),
    []
  );
  const edgeTypes = useMemo(
    () => ({
      ThoughtEdge: ThoughtEdge,
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
        edgeTypes={edgeTypes as EdgeTypes}
        proOptions={{ hideAttribution: true }}
        fitView
        zoomOnDoubleClick
      >
        <Controls className="!mb-16 sm:!mb-4" />
        <Background variant={BackgroundVariant.Dots} />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowThoughtsContainer;
