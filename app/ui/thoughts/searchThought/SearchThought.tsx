import { findThoughts } from "@/app/lib/thoughts/actions";
import { Thought } from "@prisma/client";
import { direction } from "direction";
import { useEffect, useState } from "react";

interface Props {
  callBackFunc: (thought: Thought) => void;
}
const SearchThought = ({ callBackFunc }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const fetchContainedThoughts = async () => {
    if (searchText) setThoughts(await findThoughts(searchText));
  };
  const allThoughtsList = async () => {
    setThoughts(await findThoughts(""));
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
      <button
        onClick={allThoughtsList}
        className="btn w-full btn-sm mt-1 btn-neutral"
      >
        لیست همه افکار
      </button>
      <div className="flex flex-col gap-y-2 mt-4 items-stretch w-full">
        {thoughts.map((thought) => (
          <span
            onClick={() => callBackFunc({ ...thought })}
            className="border rounded-lg w-full text-center p-1 shadow cursor-pointer"
            key={thought.id}
          >
            {thought.description}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchThought;
