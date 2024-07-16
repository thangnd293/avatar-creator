"use client";

import { useRef } from "react";
import {
  Alignment,
  Fit,
  Layout,
  RiveFile,
  RuntimeLoader,
  useRive,
} from "@rive-app/react-canvas-lite";
import styled from "styled-components";

import {
  useResizeObserver,
  useStateMachineInputs,
  useSyncStatesWithMachineInput,
} from "@/hooks";
import { MACHINE_STATE, RIVE_WASM_URL } from "@/constants/rive";
import { useAvatarStates } from "./AvatarStatesProvider";
import { useAvatarRiveFile } from "./AvatarRiveFileProvider";

RuntimeLoader.setWasmUrl(RIVE_WASM_URL);

const layout = new Layout({
  alignment: Alignment.Center,
  fit: Fit.Cover,
});

function Avatar() {
  const { isLoading, riveFile } = useAvatarRiveFile();

  const containerRef = useRef<HTMLDivElement>(null);

  const { width, height } = useResizeObserver({
    ref: containerRef,
  });

  return (
    <Container ref={containerRef}>
      <AvatarWrapper
        style={{
          "--dimension": Math.min(width, height) + "px",
        }}
      >
        {!isLoading && <MainAvatar riveFile={riveFile} />}
      </AvatarWrapper>
    </Container>
  );
}

export default Avatar;

const MainAvatar = ({ riveFile }: { riveFile: RiveFile }) => {
  const { avatarStates } = useAvatarStates();
  const { rive, RiveComponent } = useRive({
    stateMachines: MACHINE_STATE.Avatar,
    layout,
    autoplay: true,
    riveFile,
  });

  const machineInputs = useStateMachineInputs(rive, MACHINE_STATE.Avatar);
  useSyncStatesWithMachineInput(avatarStates, machineInputs);

  return <RiveComponent />;
};

const Container = styled.div`
  flex: 1;
  min-height: 220px;
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
