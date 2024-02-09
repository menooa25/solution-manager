"use client";
import { TbTrashX } from "react-icons/tb";
interface Props {
  id: number;
}

const RemoveThought = ({ id }: Props) => {
  return (
    <div>
      <button className="btn btn-circle btn-ghost text-error flex justify-center items-center p-1 btn-sm !h-full ">
        <TbTrashX size={25} />
      </button>
    </div>
  );
};

export default RemoveThought;
