"use client";

import { MACHINE_STATE, RIVE_FILE, RIVE_WASM_URL } from "@/constants/rive";
import {
  Alignment,
  Fit,
  Layout,
  RuntimeLoader,
  useRive,
} from "@rive-app/react-canvas-lite";
import styled from "styled-components";

import {
  useResizeObserver,
  useStateMachineInputs,
  useSyncStatesWithMachineInput,
} from "@/hooks";
import { useRef } from "react";
import { useAvatarStates } from "./AvatarStatesProvider";

RuntimeLoader.setWasmUrl(RIVE_WASM_URL);

const layout = new Layout({
  alignment: Alignment.Center,
  fit: Fit.Cover,
});

function Avatar() {
  const { avatarStates } = useAvatarStates();
  const containerRef = useRef<HTMLDivElement>(null);

  const { width, height } = useResizeObserver({
    ref: containerRef,
  });

  const { rive, RiveComponent: MainAvatar } = useRive({
    src: RIVE_FILE,
    stateMachines: MACHINE_STATE.Avatar,
    layout,
    autoplay: true,
  });

  const machineInputs = useStateMachineInputs(rive, MACHINE_STATE.Avatar);
  useSyncStatesWithMachineInput(avatarStates, machineInputs);

  return (
    <Container ref={containerRef}>
      <AvatarWrapper
        id="main-avatar"
        style={{
          "--dimension": Math.min(width, height) + "px",
        }}
      >
        <MainAvatar />
      </AvatarWrapper>
    </Container>
  );
}

export default Avatar;

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: end;
  justify-content: center;
  /* To fix wrapper element not shrink when height decrease */
  overflow: hidden;
`;

const AvatarWrapper = styled.div`
  width: var(--dimension);
  height: var(--dimension);
  background-color: var(--background-color);
`;
