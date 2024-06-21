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
  children,
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
      {children}
    </Button>
  );
}

export default AvatarOptionButton;

const Button = styled.button<{ $active?: boolean }>`
  display: flex;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  background-color: var(--color-gray-100);
  outline: 4px solid transparent;
  outline-offset: -4px;

  &:hover,
  &:focus {
    outline-color: var(--color-secondary);
  }

  ${({ $active }) =>
    $active &&
    css`
      outline-color: var(--color-primary);

      &:hover {
        outline-color: var(--color-primary);
      }
    `}
`;
