"use client";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  Panel,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { getAllRelatedThoughts } from "../../lib/actions";
import { extractNodesEdges, getLayoutedElements } from "../../lib/utils";
import AddThought from "./panelButtons/AddThought";
import Thought from "./singleThought/Thought";
import PanelButtonsContainer from "./panelButtons/PanelButtonsContainer";
import { ThoughtContext } from "./ReactFlowThoughtsProvider";

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
        <Controls />
        <Background variant={BackgroundVariant.Dots} />
        <Panel className="w-full !m-0" position={"top-center"}>
          <PanelButtonsContainer />
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default ReactFlowThoughtsContainer;
