import React from "react";
interface Props {
  condition: any;
}
const Loading = ({ condition }: Props) => {
  if (!condition) return;
  return <span className="loading loading-sm loading-spinner" />;
};

export default Loading;
