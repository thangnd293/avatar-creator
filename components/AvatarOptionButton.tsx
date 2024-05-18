"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { CanvasDimensions, RenderRequest } from "@/types";

interface AvatarOptionButtonProps extends React.ComponentProps<"button"> {
  canvasDimensions: CanvasDimensions;
  statesToOverride: Record<string, number>;
  currentStates: Record<string, number>;
  renderFunction: (renderRequest: RenderRequest) =>
    | {
        discardRequest: () => void;
      }
    | undefined;
}

function AvatarOptionButton({
  canvasDimensions,
  statesToOverride,
  currentStates,
  renderFunction,
  ...others
}: AvatarOptionButtonProps) {
  const ref = useRef<any>();

  useEffect(() => {
    if (!ref.current) return;

    const response = renderFunction({
      canvas: ref.current,
      statesToOverride: statesToOverride,
    });

    return response?.discardRequest;
  }, [currentStates, statesToOverride, renderFunction]);

  return (
    <Button {...others}>
      <canvas ref={ref} {...canvasDimensions} />
    </Button>
  );
}

export default AvatarOptionButton;

const Button = styled.button`
  display: flex;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  background-color: aliceblue;
`;
