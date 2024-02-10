"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { getAllRelatedThoughts } from "../../lib/thoughts/actions";
import {
  extractNodesEdges,
  getLayoutedElements,
} from "../../lib/thoughts/utils";

interface ContextType {
  nodes: Node<any, string | undefined>[];
  setNodes: Dispatch<SetStateAction<Node<any, string | undefined>[]>>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  edges: Edge<any>[];
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>;
  fetchIssues: (id: number) => Promise<any>;
  reLayout: () => void;
  mainNodeId: string;
}
export const ThoughtContext = createContext<ContextType>({
  edges: [],
  nodes: [],
  setEdges: Object as any,
  onEdgesChange: Object as any,
  onNodesChange: Object as any,
  setNodes: Object as any,
  fetchIssues: async (id) => {},
  reLayout: () => {},
  mainNodeId: "0",
});

const ReactFlowThoughtsProvider = ({ children }: PropsWithChildren) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [mainNodeId, setMainNodeId] = useState("0");
  const onLayout = (nodes: Node[], edges: Edge[]) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  };
  const reLayout = () => {
    if (nodes.length) onLayout(nodes, edges);
  };
  const fetchIssues = useCallback(async (id: number) => {
    localStorage.setItem("lastFetchId", id.toString());
    const result = await getAllRelatedThoughts(id);
    const extracted = extractNodesEdges(result);
    onLayout(extracted.nodes, extracted.edges);
    setMainNodeId(id.toString());
  }, []);
  useEffect(() => {
    const lastFetchId = +(localStorage.getItem("lastFetchId") ?? "");
    if (lastFetchId) {
      setMainNodeId(lastFetchId.toString());
      fetchIssues(lastFetchId);
    }
  }, []);
  return (
    <ThoughtContext.Provider
      value={{
        nodes,
        onNodesChange,
        edges,
        onEdgesChange,
        fetchIssues,
        setEdges,
        setNodes,
        reLayout,
        mainNodeId,
      }}
    >
      {children}
    </ThoughtContext.Provider>
  );
};

export default ReactFlowThoughtsProvider;
