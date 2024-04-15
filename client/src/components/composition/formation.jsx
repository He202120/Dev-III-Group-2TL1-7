import React from "react";
import Formation442 from "../formations/formation442";
import Formation433 from "../formations/formation433";
import Formation352 from "../formations/formation352";
import Formation4231 from "../formations/formation4231";
import Formation451 from "../formations/formation451";

function Formation(props) {
  const formation = props.formation;
  return (
    <div>
      {
        {
          "4-4-2": <Formation442 />,
          "4-3-3": <Formation433 />,
          "3-5-2": <Formation352 />,
          "4-2-3-1": <Formation4231 />,
          "4-5-1": <Formation451 />
        }[formation]
      }
    </div>
  );
}

export default Formation;
