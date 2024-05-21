"use client";

import { useState } from "react";
import styled, { css } from "styled-components";
import cookies from "js-cookie";

import AvatarOptionButton from "@/components/AvatarOptionButton";
import { useAvatarStates } from "@/components/AvatarStatesProvider";
import ColorSelect from "@/components/ColorSelect";
import ScrollArea from "@/components/ScrollArea";
import { TABS, TAB_CONTENTS } from "@/constants/avatar";
import { MACHINE_STATE, RIVE_FILE } from "@/constants/rive";
import { useRiveAdvanced } from "@/hooks";
import BackgroundColorPicker from "./BackgroundColorPicker";

interface AvatarEditorProps {
  initialBackground?: string;
}
function AvatarEditor({ initialBackground }: AvatarEditorProps) {
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

    cookies.set("avatarStates", JSON.stringify(newAvatarState), {
      expires: 365,
    });
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
        <BackgroundColorPicker initialColor={initialBackground} />
      </BackgroundColorPickerWrapper>

      {typeOptions && (
        <ScrollArea>
          <SectionWrapper>
            {typeOptions.map((typeInfo) => {
              const { state, value } = typeInfo;

              return (
                <AvatarOptionButton
                  key={`${state}-${value}`}
                  canvasScale={canvasScale}
                  canvasDimensions={canvasDimensions}
                  buttonTypeInfo={typeInfo}
                  currentStates={avatarStates}
                  renderFunction={requestRenderOnCanvas}
                  onClick={() => onChangeAvatarState(state, value)}
                />
              );
            })}
          </SectionWrapper>
        </ScrollArea>
      )}
    </Container>
  );
}

export default AvatarEditor;

const canvasScale = 2;

const canvasDimensions = {
  width: 96 * canvasScale,
  height: 96 * canvasScale,
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
    css`
      color: var(--primary-color);

      &:hover {
        color: inherit;
      }
    `}
`;
