"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  condition: any;
}
const Rendrer = ({ children, condition }: Props) => {
  if (condition) return <>{children}</>;
};

export default Rendrer;
