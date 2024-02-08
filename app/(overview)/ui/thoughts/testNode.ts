import { Node } from "reactflow";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

export const initialNodes = [
  {
    id: "5",
    type: "default",
    data: {
      label: "مسله 2",
    },
    position: {
      x: 222,
      y: 0,
    },
    targetPosition: "top",
    sourcePosition: "bottom",
  },
  {
    id: "7",
    type: "default",
    data: {
      label: "راه حل 1",
    },
    position: {
      x: 666,
      y: 0,
    },
    targetPosition: "top",
    sourcePosition: "bottom",
  },
  {
    id: "8",
    type: "default",
    data: {
      label: "راه حل 2",
    },
    position: {
      x: 888,
      y: 0,
    },
    targetPosition: "top",
    sourcePosition: "bottom",
  },
  {
    id: "4",
    type: "default",
    data: {
      label: "مسله 1",
    },
    position: {
      x: 0,
      y: 0,
    },
    targetPosition: "top",
    sourcePosition: "bottom",
  },
  {
    id: "6",
    type: "default",
    data: {
      label: "مسله 3",
    },
    position: {
      x: 444,
      y: 0,
    },
    targetPosition: "top",
    sourcePosition: "bottom",
  },
  {
    id: "9",
    type: "default",
    data: {
      label: "راه حل 3",
    },
    position: {
      x: 1110,
      y: 0,
    },
    targetPosition: "top",
    sourcePosition: "bottom",
  },
  {
    id: "10",
    type: "default",
    data: {
      label: "مسله 22",
    },
    position: {
      x: 1332,
      y: 0,
    },
    targetPosition: "top",
    sourcePosition: "bottom",
  },
  {
    id: "11",
    type: "default",
    data: {
      label: "راه حل 33",
    },
    position: {
      x: 1554,
      y: 0,
    },
    targetPosition: "top",
    sourcePosition: "bottom",
  },
];
export const initialEdges = [
  { id: "e12", source: "1", target: "2", type: edgeType, animated: true },
  { id: "e13", source: "1", target: "3", type: edgeType, animated: true },
  { id: "e22a", source: "2", target: "2a", type: edgeType, animated: true },
  { id: "e35", source: "3", target: "6", type: edgeType, animated: true },
  { id: "e22b", source: "2", target: "2b", type: edgeType, animated: true },
  { id: "e22c", source: "2", target: "2c", type: edgeType, animated: true },
  { id: "e2c2d", source: "2c", target: "2d", type: edgeType, animated: true },
  { id: "e45", source: "4", target: "5", type: edgeType, animated: true },
  { id: "e56", source: "5", target: "6", type: edgeType, animated: true },
  { id: "e57", source: "5", target: "7", type: edgeType, animated: true },
];
