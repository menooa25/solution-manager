"use client";

import { CgDetailsMore } from "react-icons/cg";
import AccountLink from "./AccountLink";
import AddThought from "./AddThought";
import FindThought from "./FindThought";
import ReLayout from "./ReLayout";
import { usePathname } from "next/navigation";
import Rendrer from "../Rendrer";
import FocusToNode from "./FocusToNode";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <div className="w-screen absolute z-10">
      <div className="hidden  sm:flex justify-center gap-x-2 mt-2 ">
        <AccountLink />
        <FindThought />
        <AddThought type="solution" />
        <AddThought type="issue" />
      </div>

      <div className="flex flex-col">
        <div className="dropdown sm:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <CgDetailsMore size={30} />
          </div>
          <div
            tabIndex={0}
            className="menu menu-sm dropdown-content   z-[1] p-2 pt-3 shadow bg-base-100 rounded-box w-screen top-0"
          >
            <FindThought />
            <AddThought type="solution" />
            <AddThought type="issue" />
            <AccountLink />
          </div>
        </div>
        <Rendrer condition={pathName === "/"}>
          <div className="ml-2 sm:m-0 sm:absolute sm:left-3 sm:top-3">
            <ReLayout />
            <FocusToNode />
          </div>
        </Rendrer>
      </div>
    </div>
  );
};

export default Navbar;
