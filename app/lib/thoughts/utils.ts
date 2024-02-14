import { Edge, Node, Position } from "reactflow";
import dagre from "@dagrejs/dagre";
import { FetchedTypes } from "./types";
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
const getStrokeColor = (
  thoughtFeelGood: boolean,
  isParent: boolean,
  feelGood: boolean
) => {
  if (isParent) {
    return !thoughtFeelGood ? "#e93f33" : "#45aeee";
  } else {
    return !feelGood ? "#e93f33" : "#45aeee";
  }
};
export const extractNodesEdges = (thoughts: FetchedTypes) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const addedEdgesIds: string[] = [];
  const getNodeEdge = (
    thought: FetchedTypes | any,
    id?: number,
    feelGood?: boolean,
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
        const edgeId =
          relate === "parent" ? `e${id}${thought.id}` : `e${thought.id}${id}`;
        if (!addedEdgesIds.includes(edgeId)) {
          const strokeColor = getStrokeColor(
            thought.feelGood,
            relate === "parent",
            feelGood === true
          );

          edges.push({
            id: edgeId,
            source: relate === "parent" ? id.toString() : thought.id.toString(),
            target: relate === "parent" ? thought.id.toString() : id.toString(),
            style: { stroke: strokeColor },
          });
          addedEdgesIds.push(edgeId);
        }
      }

      //   recursive
      if (thought?.solutions)
        for (let solution of thought.solutions) {
          getNodeEdge(solution, thought.id, thought.feelGood, "parent");
        }
      if (thought?.issues)
        for (let issue of thought.issues) {
          getNodeEdge(issue, thought.id, thought.feelGood, "child");
        }
    }
  };

  getNodeEdge(thoughts);
  return { nodes, edges };
};
