"use client";

import { ThoughtNodeContext } from "@/app/ui/thoughts/ThoughtsNodeProvider";
import { useContext, useEffect, useState } from "react";

const useLocateNodeInIDChange = () => {
  const [addedNodeId, setAddedNodeId] = useState<string>();
  const { locateMainNode, mainNodeId } = useContext(ThoughtNodeContext);

  useEffect(() => {
    if (addedNodeId && mainNodeId && addedNodeId === mainNodeId) {
      locateMainNode();
      setAddedNodeId(undefined);
    }
  }, [addedNodeId, mainNodeId]);
  return { setAddedNodeId };
};

export default useLocateNodeInIDChange;
