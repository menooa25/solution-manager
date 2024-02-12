"use client";
import { toPng } from "html-to-image";
import {
  getNodesBounds,
  getRectOfNodes,
  getTransformForBounds,
  getViewportForBounds,
  useReactFlow,
} from "reactflow";

const ExportImage = () => {
  const imageWidth = 1024;
  const imageHeight = 768;
  const downloadImage = (dataUrl: string) => {
    const a = document.createElement("a");

    a.setAttribute("download", "Your thoughts.png");
    a.setAttribute("href", dataUrl);
    a.click();
  };
  const { getNodes } = useReactFlow();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getNodesBounds(getNodes());
    const { x, y, zoom } = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    const doc: any = document;
    toPng(doc.querySelector(".react-flow__viewport"), {
      backgroundColor: "#1a365d",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth.toString(),
        height: imageHeight.toString(),
        transform: `translate(${x}px, ${y}px) scale(${zoom})`,
      },
    }).then(downloadImage);
  };
  return (
    <button className="btn btn-ghost btn-xs sm:btn sm:btn-xs" onClick={onClick}>
      خروجی عکس
    </button>
  );
};

export default ExportImage;
