import React from "react";

const Backdrop = () => {
  return (
    <div
      className={`${props.z} fixed top-0 left-0 w-full h-screen ${props.backdrop} bg-neutral-900`}
      onClick={props.onClick}
    />
  );
};

export default Backdrop;
