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
import { QUERIES } from "@/constants/styles";

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
      <TabScrollArea>
        <TabsWrapper>
          {TABS.map(({ name, state }) => (
            <ButtonTab
              key={state}
              $active={state === currentTab}
              onClick={() => setCurrentTab(state)}
            >
              {name}
            </ButtonTab>
          ))}
        </TabsWrapper>
      </TabScrollArea>

      {colorOptions && (
        <ColorSettingWrapper>
          {colorOptions.map((options) => (
            <ColorSelect
              key={options[0].state}
              value={avatarStates[options[0].state]}
              onChange={onChangeAvatarState.bind(null, options[0].state)}
              options={options}
            />
          ))}
        </ColorSettingWrapper>
      )}

      <BackgroundColorPickerWrapper>
        <BackgroundColorPicker initialColor={initialBackground} />
      </BackgroundColorPickerWrapper>

      {typeOptions && (
        <ScrollArea>
          <OptionsWrapper>
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
          </OptionsWrapper>
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
  height: 220px;
  flex-direction: column;
  padding: 0 28px 8px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  position: relative;

  @media ${QUERIES.tabletAndSmaller} {
    height: 40%;
  }
`;

const TabScrollArea = styled(ScrollArea)`
  flex-shrink: 0;
`;

const TabsWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px 0 12px 0;
`;

const OptionsWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 16px;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 8px;
    flex-wrap: wrap;
  }
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
  padding-top: 16px;
  padding-bottom: 16px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: var(--color-gray-600);
  transition: color 0.2s;
  font-weight: var(--weight-bold);
  white-space: nowrap;

  &:hover {
    color: var(--color-gray-900);
  }

  & ~ & {
    margin-left: 16px;
  }

  ${({ $active }) =>
    $active &&
    css`
      color: var(--color-primary);
      font-weight: var(--weight-bold);

      &:hover {
        color: var(--color-primary);
      }
    `}
`;
