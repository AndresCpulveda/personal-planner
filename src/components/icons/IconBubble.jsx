import React, { useState } from "react";

import "./iconBubble.styles.css";

function IconBubble({ description }) {
  return (
    <div className="relative">
      <div className="speech bottom absolute bottom-3 right-[-65px] w-36 rounded bg-slate-400 px-2 text-center text-xs text-white">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default IconBubble;
