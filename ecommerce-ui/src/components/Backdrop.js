import React from "react";

const Backdrop = (props) => {
  return (
    <div
      className={`z-[70] fixed top-0 left-0 w-full h-screen opacity-45 bg-neutral-900`}
      onClick={props.onClick}
    />
  );
};

export default Backdrop;
