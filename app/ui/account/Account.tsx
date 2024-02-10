"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Account = () => {
  const { data } = useSession();
  const [hideImage, setHideImage] = useState(false);
  const image = data?.user?.image;
  const nameOfUser = data?.user?.name;
  useEffect(() => {
    setHideImage(false);
  }, [image]);

  return (
    <div className="flex flex-col h-full justify-between w-full  px-3 sm:pt-32 sm:gap-y-10 items-center">
      {image && !hideImage && (
        <div className="avatar w-full flex justify-center ">
          <div className="w-24 rounded-full">
            <img
              src={image}
              onError={() => setHideImage(true)}
              referrerPolicy="no-referrer"
              alt="user avatar"
            />
          </div>
        </div>
      )}
      {nameOfUser && (
        <p dir="rtl" className="text-center w-full">
          {data?.user?.name} عزیز خوش آمدید 😊
        </p>
      )}
      <button
        className="btn btn-sm w-full sm:w-52 mt-10"
        onClick={() => signOut()}
      >
        خروج از حساب کاربری
      </button>
    </div>
  );
};

export default Account;
