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
  useReactFlow,
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
  locateMainNode: () => void;
}
export const ThoughtNodeContext = createContext<ContextType>({
  edges: [],
  nodes: [],
  setEdges: Object as any,
  onEdgesChange: Object as any,
  onNodesChange: Object as any,
  setNodes: Object as any,
  fetchIssues: async (id) => {},
  reLayout: () => {},
  mainNodeId: "0",
  locateMainNode: () => {},
});

const ThoughtsNodeProvider = ({ children }: PropsWithChildren) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setCenter } = useReactFlow();

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
  const locateMainNode = () => {
    const mainNode = nodes.find(({ id }) => id === mainNodeId);
    if (mainNode) {
      const { x, y } = mainNode.position;
      setCenter(x, y, { duration: 800 });
    }
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
    <ThoughtNodeContext.Provider
      value={{
        nodes,
        locateMainNode,
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
    </ThoughtNodeContext.Provider>
  );
};

export default ThoughtsNodeProvider;
