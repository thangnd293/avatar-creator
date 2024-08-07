"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { Fragment } from "react";
import styled from "styled-components";

import { useAvatarStates } from "@/components/AvatarStatesProvider";
import ScrollArea from "@/components/ScrollArea";
import VisuallyHidden from "@/components/VisuallyHidden";
import { TABS } from "@/constants/avatar";
import { MACHINE_STATE } from "@/constants/rive";
import { QUERIES } from "@/constants/styles";
import { useRiveAdvanced } from "@/hooks";
import AvatarOptionButton from "./AvatarOptionButton";
import BackgroundColorPicker from "./BackgroundColorPicker";
import { useAvatarRiveFile } from "../AvatarRiveFileProvider";
import Skeleton from "../Skeleton";
import Icons from "@/components/Icons";

function AvatarEditor() {
  const { avatarStates, changeAvatarState } = useAvatarStates();
  const { isLoading, riveFile } = useAvatarRiveFile();

  const { requestRenderOnCanvas, updateBaseState } = useRiveAdvanced({
    canvasDimensions,
    initialStates: avatarStates,
    riveFile,
    stateMachine: MACHINE_STATE.Buttons,
  });

  function onChangeAvatarState(key: string, value: number) {
    const newAvatarState = { ...avatarStates, [key]: value };

    changeAvatarState(key, value);
    updateBaseState(newAvatarState);
  }

  return (
    <Container defaultValue={TABS[0].name}>
      <BackgroundColorPickerWrapper>
        <BackgroundColorPicker />
      </BackgroundColorPickerWrapper>

      <TabsListScrollArea>
        <TabsList aria-label="Custom your avatar">
          {TABS.map(({ name }) => (
            <TabsTrigger key={name} value={name}>
              <IconWrapper>
                <Icons width={24} height={24} type={name} />
              </IconWrapper>
              <TabName>{name}</TabName>
            </TabsTrigger>
          ))}
        </TabsList>
      </TabsListScrollArea>

      <ScrollArea>
        {TABS.map(({ name, variants, colors }) => (
          <TabsContent key={name} value={name}>
            {colors?.map(({ name, options }, index) => (
              <Fragment key={name}>
                <Title>{name}</Title>
                <ColorWrapper>
                  {isLoading &&
                    options.map((option) => (
                      <ButtonColorSkeleton key={option.value} />
                    ))}

                  {!isLoading &&
                    options.map((option) => (
                      <ButtonColor
                        key={option.value}
                        style={{
                          "--color": option.color,
                          "--outline-color":
                            option.value === avatarStates[option.state]
                              ? "var(--color-primary)"
                              : undefined,
                        }}
                        color={option.color}
                        onClick={onChangeAvatarState.bind(
                          null,
                          option.state,
                          option.value
                        )}
                      >
                        <VisuallyHidden>
                          {name} color {index}
                        </VisuallyHidden>
                      </ButtonColor>
                    ))}
                </ColorWrapper>
              </Fragment>
            ))}

            <Title>{variants.name}</Title>
            <VariantWrapper>
              {isLoading &&
                Array.from({ length: variants.options.length }, (_, index) => (
                  <AvatarOptionButtonSkeleton key={index} />
                ))}

              {!isLoading &&
                variants.options.map((variant, index) => {
                  const { state, value } = variant;

                  return (
                    <AvatarOptionButton
                      key={value}
                      canvasScale={canvasScale}
                      canvasDimensions={canvasDimensions}
                      buttonTypeInfo={variant}
                      currentStates={avatarStates}
                      renderFunction={requestRenderOnCanvas}
                      onClick={() => onChangeAvatarState(state, value)}
                    >
                      <VisuallyHidden>
                        {name} variant {index}
                      </VisuallyHidden>
                    </AvatarOptionButton>
                  );
                })}
            </VariantWrapper>
          </TabsContent>
        ))}
      </ScrollArea>
    </Container>
  );
}

export default AvatarEditor;

const canvasScale = 2;
const buttonSize = 96;

const canvasDimensions = {
  width: buttonSize * canvasScale,
  height: buttonSize * canvasScale,
};

const Container = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  height: clamp(220px, 30%, 400px);
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
const TabsListScrollArea = styled(ScrollArea)`
  flex-shrink: 0;
`;

const TabsList = styled(Tabs.List)`
  display: flex;
  padding: 8px 0;
  gap: 24px;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 16px;
    margin-bottom: 8px;
  }
`;

const TabsTrigger = styled(Tabs.Trigger)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: var(--color-gray-700);
  transition: color 0.2s;
  font-weight: var(--weight-bold);
  white-space: nowrap;
  user-select: none;

  &:hover {
    color: var(--color-gray-900);
  }

  &[data-state="active"] {
    color: var(--color-primary);
  }

  @media ${QUERIES.tabletAndSmaller} {
    background-color: var(--color-gray-100);
    border-radius: 9999px;
    height: 40px;
    padding: 8px 16px;
  }
`;

const IconWrapper = styled.span`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    display: inline-block;
  }
`;

const TabName = styled.span`
  @media ${QUERIES.tabletAndSmaller} {
    ${TabsTrigger}[data-state="inactive"] & {
      display: none;
    }
  }
`;

const TabsContent = styled(Tabs.Content)`
  outline: none;
  padding: 0 4px;
`;

const ColorWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--button-color-size));
  gap: 16px;
`;

const VariantWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 96px);
  gap: 16px;

  @media ${QUERIES.tabletAndSmaller} {
    justify-content: space-evenly;
  }
`;

const Title = styled.h3`
  color: var(--color-gray-700);
  font-weight: var(--weight-bold);
  margin-bottom: 16px;

  &:not(:first-of-type) {
    margin-top: 24px;
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

const ButtonColor = styled.button`
  width: var(--button-color-size);
  height: var(--button-color-size);
  border-radius: 12px;
  background-color: var(--color);
  border: none;
  cursor: pointer;
  outline: 2px inset var(--outline-color, transparent);
  outline-offset: 2px;

  &:hover,
  &:focus {
    outline-color: var(--outline-color, var(--color-secondary));
  }
`;

const ButtonColorSkeleton = styled(Skeleton)`
  width: var(--button-color-size);
  height: var(--button-color-size);
  border-radius: 12px;
`;

const AvatarOptionButtonSkeleton = styled(Skeleton)`
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  border-radius: 8px;
`;
