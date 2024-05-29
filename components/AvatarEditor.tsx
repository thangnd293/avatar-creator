"use client";

import { useState } from "react";
import styled, { css } from "styled-components";

import AvatarOptionButton from "@/components/AvatarOptionButton";
import { useAvatarStates } from "@/components/AvatarStatesProvider";
import ColorSelect from "@/components/ColorSelect";
import ScrollArea from "@/components/ScrollArea";
import { TABS, TAB_CONTENTS } from "@/constants/avatar";
import { MACHINE_STATE, RIVE_FILE } from "@/constants/rive";
import { useRiveAdvanced } from "@/hooks";
import BackgroundColorPicker from "./BackgroundColorPicker";
import { QUERIES } from "@/constants/styles";
import ColorSelectMobile from "./ColorSelectMobile";

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
  const type = tabContent.types;

  function onChangeAvatarState(key: string, value: number) {
    const newAvatarState = { ...avatarStates, [key]: value };

    changeAvatarState(key, value);
    updateBaseState(newAvatarState);
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
          {colorOptions.map(({ options }) => (
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

      <ScrollArea>
        <ContentWrapper>
          {colorOptions?.map(({ title, options }) => (
            <ColorSelectMobile
              key={options[0].state}
              title={title}
              value={avatarStates[options[0].state]}
              onChange={onChangeAvatarState.bind(null, options[0].state)}
              options={options}
            />
          ))}

          <div>
            <TypeTitle>{type.title}</TypeTitle>
            <OptionsWrapper>
              {type.options.map((typeInfo) => {
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
          </div>
        </ContentWrapper>
      </ScrollArea>
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
  height: 220px;
  flex-direction: column;
  padding: 0 28px 8px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  position: relative;

  @media ${QUERIES.tabletAndSmaller} {
    height: 40%;
    margin-left: -24px;
    margin-right: -24px;
    margin-bottom: -24px;
    border-radius: 0px;
    padding-left: 24px;
    padding-right: 24px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    margin-left: -16px;
    margin-right: -16px;
    margin-bottom: -16px;
    padding-left: 16px;
    padding-right: 16px;
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 16px 0;
`;

const OptionsWrapper = styled.div`
  display: flex;
  gap: 16px;

  @media ${QUERIES.tabletAndSmaller} {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: repeat(5, minmax(132px, 1fr));
    justify-items: center;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, minmax(132px, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(3, minmax(132px, 1fr));
  }

  @media ${QUERIES.phoneAndSmaller} {
    grid-template-columns: repeat(2, minmax(132px, 1fr));
  }
`;

const TypeTitle = styled.h3`
  display: none;
  color: var(--color-gray-700);
  font-weight: var(--weight-bold);
  margin-bottom: 16px;

  @media ${QUERIES.tabletAndSmaller} {
    display: revert;
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

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const BackgroundColorPickerWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 16px;

  @media ${QUERIES.tabletAndSmaller} {
    right: 24px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    right: 16px;
  }
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

      &:hover {
        color: var(--color-primary);
      }
    `}
`;
