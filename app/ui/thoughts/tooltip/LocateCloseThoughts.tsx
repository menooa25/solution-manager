"use client";

import { useContext } from "react";
import { LuRadar } from "react-icons/lu";
import { ThoughtNodeContext } from "../ThoughtsNodeProvider";

interface Props {
  id: number;
}
const LocateCloseThoughts = ({ id }: Props) => {
  const { fetchIssues } = useContext(ThoughtNodeContext);

  return (
    <button
      onClick={() => fetchIssues(id)}
      className="btn btn-circle btn-ghost text-primary flex justify-center items-center p-1 btn-sm !h-full "
    >
      <LuRadar size={25} />
    </button>
  );
};

export default LocateCloseThoughts;
