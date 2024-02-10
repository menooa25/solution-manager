"use client";

import { CgDetailsMore } from "react-icons/cg";
import AccountLink from "./AccountLink";
import AddThought from "./AddThought";
import FindThought from "./FindThought";
import ReLayout from "./ReLayout";

const PanelButtonsContainer = () => {
  return (
    <div className="w-screen absolute z-10">
      <div className="hidden  sm:flex justify-center gap-x-2 mt-2 ">
        <AccountLink />
        <FindThought />
        <AddThought type="solution" />
        <AddThought type="issue" />
        <ReLayout />
      </div>

      <div className="flex flex-col">
        <div className="dropdown sm:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <CgDetailsMore size={30} />
          </div>
          <div
            tabIndex={0}
            className="menu menu-sm dropdown-content   z-[1] p-2 shadow bg-base-100 rounded-box w-screen top-0"
          >
            <ul>
              <li>
                <FindThought />
              </li>
              <li>
                <AddThought type="solution" />
              </li>
              <li>
                <AddThought type="issue" />
              </li>
              <li>
                <AccountLink />
              </li>
            </ul>
          </div>
        </div>
        <div className="sm:hidden ml-2">
          <ReLayout />
        </div>
      </div>
    </div>
  );
};

export default PanelButtonsContainer;
