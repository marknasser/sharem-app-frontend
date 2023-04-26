import React from "react";
import { FallingLines } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <FallingLines
        color="#4fa94d"
        width={150}
        height={50}
        visible={true}
        ariaLabel="falling-lines-loading"
        className="m-5"
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
