import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeMarkerType,
  EdgeText,
  getBezierPath,
} from "reactflow";
import DeleteForm from "./DeleteForm";

// exampleProps = {
//   id: "e5057",
//   source: "50",
//   target: "57",
//   selected: false,
//   animated: false,
//   style: {
//     stroke: "#e93f33",
//   },
//   sourceX: 2444.21875,
//   sourceY: 375,
//   targetX: 3551.703125,
//   targetY: 431,
//   sourcePosition: "bottom",
//   targetPosition: "top",
//   markerStart: "url(#)",
//   markerEnd: "url(#)",
// }

interface Props {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  target: string;
  source: string;
  style: { stroke: string };
  markerEnd?: string;
}

const ThoughtEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  markerEnd,
  style,
}: Props) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <DeleteForm source={source} target={target} />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
export default ThoughtEdge;
