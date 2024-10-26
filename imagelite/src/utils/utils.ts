import React from "react";

function formatBytes(bytes: number = 0, decimals = 2) {
  if (!+bytes) return "0 bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

interface RenderIfProps {
  condition?: boolean;
  children: React.ReactNode;
}
const renderIf: React.FC<RenderIfProps> = ({ condition = true, children }) => {
  if (condition) {
    return children;
  }
  return false;
};

export const Utils = {
  formatBytes,
  renderIf,
};
