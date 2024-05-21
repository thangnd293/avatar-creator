"use client";

import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { ButtonTypeInfo, CanvasDimensions, RenderRequest } from "@/types";

interface AvatarOptionButtonProps extends React.ComponentProps<"button"> {
  canvasDimensions: CanvasDimensions;
  canvasScale: number;
  buttonTypeInfo: ButtonTypeInfo;
  currentStates: Record<string, number>;
  renderFunction: (renderRequest: RenderRequest) =>
    | {
        discardRequest: () => void;
      }
    | undefined;
}

function AvatarOptionButton({
  canvasDimensions,
  canvasScale,
  buttonTypeInfo,
  currentStates,
  renderFunction,
  ...others
}: AvatarOptionButtonProps) {
  const ref = useRef<any>();
  const isActive =
    currentStates[buttonTypeInfo.state] ===
    buttonTypeInfo.statesToOverride[buttonTypeInfo.state];

  // Reflect new changes on the canvas
  useEffect(() => {
    if (!ref.current) return;

    const response = renderFunction({
      canvas: ref.current,
      statesToOverride: buttonTypeInfo.statesToOverride,
    });

    return response?.discardRequest;
  }, [currentStates, buttonTypeInfo.statesToOverride, renderFunction]);

  return (
    <Button $active={isActive} {...others}>
      <canvas
        style={{
          width: canvasDimensions.width / canvasScale,
          height: canvasDimensions.height / canvasScale,
        }}
        ref={ref}
        {...canvasDimensions}
      />
    </Button>
  );
}

export default AvatarOptionButton;

const Button = styled.button<{ $active?: boolean }>`
  display: flex;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  background-color: white;

  border: 4px solid transparent;

  &:hover {
    border-color: var(--secondary-color);
  }

  ${({ $active }) =>
    $active &&
    css`
      border-color: var(--primary-color);

      &:hover {
        border-color: var(--primary-color);
      }
    `}
`;
