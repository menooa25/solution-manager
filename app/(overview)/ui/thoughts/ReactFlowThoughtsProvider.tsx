"use client";

import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnEdgesChange,
  OnNodesChange,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { getAllRelatedThoughts } from "../../lib/actions";
import { extractNodesEdges, getLayoutedElements } from "../../lib/utils";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
} from "react";

interface ContextType {
  nodes: Node<any, string | undefined>[];
  setNodes: Dispatch<SetStateAction<Node<any, string | undefined>[]>>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  edges: Edge<any>[];
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>;
  fetchIssues: (id: number) => Promise<any>;
  reLayout: () => void;
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
});

const ReactFlowThoughtsProvider = ({ children }: PropsWithChildren) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onLayout = (nodes: Node[], edges: Edge[]) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  };
  const reLayout = () => onLayout(nodes, edges);
  const fetchIssues = async (id: number) => {
    localStorage.setItem("lastFetchId", id.toString());
    const result = await getAllRelatedThoughts(id);
    const extracted = extractNodesEdges(result);
    onLayout(extracted.nodes, extracted.edges);
  };
  useEffect(() => {
    const lastFetchId = +(localStorage.getItem("lastFetchId") ?? "");
    if (lastFetchId) fetchIssues(lastFetchId);
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
      }}
    >
      {children}
    </ThoughtContext.Provider>
  );
};

export default ReactFlowThoughtsProvider;
