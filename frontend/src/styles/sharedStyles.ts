export const crtLinesStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background:
    "repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 2px, transparent 2px, transparent 3px)",
  pointerEvents: "none",
  zIndex: 2,
  boxShadow: "0px 0px 8px 3px rgba(0,255,0,0.8)", // Glowing effect
};
