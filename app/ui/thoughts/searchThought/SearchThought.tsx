import { findThoughts } from "@/app/lib/thoughts/actions";
import { Thought } from "@prisma/client";
import { direction } from "direction";
import React, { useContext, useEffect, useState } from "react";
import { ThoughtContext } from "../ReactFlowThoughtsProvider";

interface Props {
  callBackFunc?: () => void;
}
const SearchThought = ({ callBackFunc }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const { fetchIssues } = useContext(ThoughtContext);
  const fetchContainedThoughts = async () => {
    if (searchText) setThoughts(await findThoughts(searchText));
  };
  const onSelect = (id: number) => {
    fetchIssues(id);
    callBackFunc && callBackFunc();
  };
  useEffect(() => {
    const timeout = setTimeout(fetchContainedThoughts, 800);
    return () => clearTimeout(timeout);
  }, [searchText]);
  return (
    <div className="flex flex-col items-end">
      <label className="form-control w-full  ">
        <div className="label pb-1 text-sm font-bold">
          <span className="label-text-alt text-right w-full ">
            بخشی از مسله یا راه حل
          </span>
        </div>
        <input
          dir={direction(searchText)}
          value={searchText}
          onChange={({ target: { value } }) => setSearchText(value)}
          type="text"
          className="input input-bordered input-sm w-full   focus-visible:outline-none "
        />
      </label>
      <div className="flex flex-col gap-y-2 mt-4 items-stretch w-full">
        {thoughts.map(({ description, id }) => (
          <span
            onClick={() => onSelect(id)}
            className="border rounded-lg w-full text-center p-1 shadow cursor-pointer"
            key={id}
          >
            {description}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchThought;
