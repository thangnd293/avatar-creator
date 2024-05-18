"use client";

import { useState } from "react";
import styled from "styled-components";

import { useRiveAdvanced } from "@/hooks";
import AvatarOptionButton from "@/components/AvatarOptionButton";
import { useAvatarStates } from "@/components/AvatarStatesProvider";
import ColorSelect from "@/components/ColorSelect";
import ScrollArea from "@/components/ScrollArea";
import { TABS, TAB_CONTENTS } from "@/constants/avatar";
import { MACHINE_STATE, RIVE_FILE } from "@/constants/rive";
import BackgroundColorPicker from "./BackgroundColorPicker";

function AvatarEditor() {
  const [currentTab, setCurrentTab] = useState(TABS[0].state);

  const { avatarStates, changeAvatarState } = useAvatarStates();

  const { requestRenderOnCanvas, updateBaseState } = useRiveAdvanced({
    canvasDimensions,
    initialStates: avatarStates,
    riveFile: RIVE_FILE,
    stateMachine: MACHINE_STATE.Buttons,
  });

  const tabContent = TAB_CONTENTS[currentTab];
  const colorOptions = tabContent.colors;
  const typeOptions = tabContent.types;

  function onChangeAvatarState(key: string, value: number) {
    const newAvatarState = { ...avatarStates, [key]: value };

    changeAvatarState(key, value);
    updateBaseState(newAvatarState);
  }

  return (
    <Container>
      <ScrollArea>
        <SectionWrapper>
          {TABS.map(({ name, state }) => (
            <ButtonTab
              key={state}
              $active={state === currentTab}
              onClick={() => setCurrentTab(state)}
            >
              {name}
            </ButtonTab>
          ))}
        </SectionWrapper>
      </ScrollArea>

      {colorOptions && (
        <ColorSettingWrapper>
          {colorOptions.map((colors) => (
            <ColorSelect
              key={colors[0].state}
              value={avatarStates[colors[0].state]}
              onChange={onChangeAvatarState.bind(null, colors[0].state)}
              options={colors}
            />
          ))}
        </ColorSettingWrapper>
      )}

      <BackgroundColorPickerWrapper>
        <BackgroundColorPicker />
      </BackgroundColorPickerWrapper>

      {typeOptions && (
        <ScrollArea>
          <SectionWrapper>
            {typeOptions.map(({ state, value, statesToOverride }) => (
              <AvatarOptionButton
                key={`${state}-${value}`}
                canvasDimensions={canvasDimensions}
                statesToOverride={statesToOverride}
                currentStates={avatarStates}
                renderFunction={requestRenderOnCanvas}
                onClick={() => onChangeAvatarState(state, value)}
              />
            ))}
          </SectionWrapper>
        </ScrollArea>
      )}
    </Container>
  );
}

export default AvatarEditor;

const canvasDimensions = {
  width: 96,
  height: 96,
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 204px;
  flex-direction: column;
  justify-content: center;
  padding: 0 28px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  position: relative;
`;

const SectionWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 0;
`;

const ColorSettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 16px;
`;

const BackgroundColorPickerWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 16px;
`;

const ButtonTab = styled.button<{ $active?: boolean }>`
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: #bbb;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: #999;
  }

  & ~ & {
    margin-left: 16px;
  }

  ${({ $active }) =>
    $active &&
    `
    color: var(--primary-color) !important;
  `}
`;
