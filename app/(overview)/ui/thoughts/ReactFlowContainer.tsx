"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import Thought from "./Thought";
import PanelButtonsContainer from "./panelButtons/PanelButtonsContainer";

const ConnectedNodes = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [pureEdgesAndNodes, setPureEdgesAndNodes] = useState<{
    nodes: Node[];
    edges: Edge[];
  }>();
  const nodeTypes = useMemo(
    () => ({
      thought: Thought,
    }),
    []
  );
  const fetchIssues = async () => {
    const result = await getAllRelatedThoughts(5);
    const extracted = extractNodesEdges(result);
    setPureEdgesAndNodes(extracted);
    onLayout(extracted.nodes, extracted.edges);
  };
  const onLayout = (nodes: Node[], edges: Edge[]) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  };
  useEffect(() => {
    fetchIssues();
  }, []);
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

export default ConnectedNodes;
