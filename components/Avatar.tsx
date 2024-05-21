"use client";

import { MACHINE_STATE, RIVE_FILE, RIVE_WASM_URL } from "@/constants/rive";
import {
  Alignment,
  Fit,
  Layout,
  RuntimeLoader,
  useRive,
} from "@rive-app/react-canvas";
import styled from "styled-components";

import { useStateMachineInputs, useSyncStatesWithMachineInput } from "@/hooks";
import { useAvatarStates } from "./AvatarStatesProvider";

RuntimeLoader.setWasmUrl(RIVE_WASM_URL);

const layout = new Layout({
  alignment: Alignment.Center,
  fit: Fit.Cover,
});

function Avatar() {
  const { avatarStates } = useAvatarStates();

  const { rive, RiveComponent: MainAvatar } = useRive({
    src: RIVE_FILE,
    stateMachines: MACHINE_STATE.Avatar,
    layout,
    autoplay: true,
  });

  const machineInputs = useStateMachineInputs(rive, MACHINE_STATE.Avatar);
  useSyncStatesWithMachineInput(avatarStates, machineInputs);

  return (
    <Wrapper id="main-avatar">
      <MainAvatar />
    </Wrapper>
  );
}

export default Avatar;

const Wrapper = styled.div`
  height: calc(100% - 64px - 204px);
  min-height: 272px;
  aspect-ratio: 1/1;
  margin: 0 auto;
  background-color: var(--background-color);
`;
