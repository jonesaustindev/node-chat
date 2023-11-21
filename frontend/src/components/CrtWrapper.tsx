import { ReactNode } from "react";
import { crtLinesStyle } from "../styles/sharedStyles";

function CrtWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="bg-black shadow-lg overflow-hidden h-screen">
      <div
        className="relative bg-green-900 text-green-300 p-4 font-mono text-sm"
        style={{ height: "100%" }}
      >
        <div style={crtLinesStyle}></div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default CrtWrapper;
