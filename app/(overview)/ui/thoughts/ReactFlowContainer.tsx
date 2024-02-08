"use client";
import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  Panel,
  Position,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from "reactflow";
import Thought from "./Thought";
import AddIssue from "./AddIssue";

const initialNodes: Node<any, string | undefined>[] = [
  {
    position: { x: 0, y: 0 },
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    deletable: false,
  },

  {
    id: "2",
    position: { x: 200, y: 150 },
    deletable: false,
    type: "thought",
    data: {},
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
    deletable: false,
  },
];

const initialEdges: Edge<any>[] = [
  {
    id: "e1-2",
    source: "1",
    targetHandle: "22-t",
    target: "2",
    style: {
      stroke: "#FF0072",
    },
    deletable: false,
  },
  {
    id: "e2-3",
    source: "2",
    sourceHandle: "22-s",
    target: "3",
    deletable: false,
  },
];

const ConnectedNodes = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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
        fitView
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} />
        <Panel className="w-full" position={"top-center"}>
          <div className="flex justify-center">
            <AddIssue />
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default ConnectedNodes;
