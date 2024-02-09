import { Edge, Node, Position } from "reactflow";
import dagre from "@dagrejs/dagre";
import { FetchedTypes } from "./types";
import { Thought } from "@prisma/client";
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "TB"
) => {
  const nodeWidth = 172;
  const nodeHeight = 36;
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};
export const extractNodesEdges = (thoughts: FetchedTypes) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const getNodeEdge = (
    thought: FetchedTypes | any,
    id?: number,
    relate?: "parent" | "child"
  ) => {
    if (thought?.id) {
      nodes.push({
        id: thought.id.toString(),
        type: "thought",
        data: thought,
        position: { x: 0, y: 0 },
      });
      if (id) {
        edges.push({
          id:
            relate === "parent" ? `e${id}${thought.id}` : `e${thought.id}${id}`,
          source: relate === "parent" ? id.toString() : thought.id.toString(),
          target: relate === "parent" ? thought.id.toString() : id.toString(),
          style: { stroke: !thought.feelGood ? "#e93f33" : "#45aeee" },
        });
      }

      //   recursive
      if (thought?.solutions)
        for (let solution of thought.solutions) {
          getNodeEdge(solution, thought.id, "parent");
        }
      if (thought?.issues)
        for (let issue of thought.issues) {
          getNodeEdge(issue, thought.id, "child");
        }
    }
  };
  getNodeEdge(thoughts);
  return { nodes, edges };
};
