"use client";

import Link from "next/link";

const AccountLink = () => {
  return (
    <Link href={"/account"} className="btn btn-ghost btn-xs sm:btn sm:btn-xs">
      حساب کاربری
    </Link>
  );
};

export default AccountLink;
