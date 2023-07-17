import React from "react";

function TimeAndLocation() {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          Monday, 16 July 2023 | Local time: 12:46
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">Mumbai, IN</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
