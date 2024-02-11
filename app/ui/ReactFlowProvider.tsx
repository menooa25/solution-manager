"use client";
import { PropsWithChildren } from "react";
import { ReactFlowProvider as ReactFlowProviderMain } from "reactflow";

const ReactFlowProvider = ({ children }: PropsWithChildren) => {
  return <ReactFlowProviderMain>{children}</ReactFlowProviderMain>;
};

export default ReactFlowProvider;
