import React from "react";

interface SpanErrorProps {
  message: string | undefined;
}
export const SpanError: React.FC<SpanErrorProps> = ({
  message,
}: SpanErrorProps) => {
  return <span className="text-red-500 text-xs">{message}</span>;
};
