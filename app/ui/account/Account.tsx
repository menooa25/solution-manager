"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
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
    <div className="flex flex-col h-full justify-between w-full  px-3 pt-10 sm:pt-32 gap-y-10 items-center">
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
      <div className="mt-10 flex gap-x-2 justify-center w-full">
        <Link href={"/"} className="btn btn-sm btn-primary sm:w-52 ">
          برگشت به صفحه اصلی
        </Link>{" "}
        <button
          className="btn btn-sm  sm:w-52 "
          onClick={() => {
            signOut();
            localStorage.clear();
          }}
        >
          خروج از حساب کاربری
        </button>
      </div>
    </div>
  );
};

export default Account;
