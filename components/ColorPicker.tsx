"use client";

import React, { forwardRef, useId } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import styled from "styled-components";

interface ColorPickerProps
  extends React.ComponentProps<typeof HexColorPicker> {}

function ColorPicker(
  { color, onChange, ...others }: ColorPickerProps,
  ref: React.Ref<HTMLDivElement>
) {
  const id = useId();
  const inputId = `${id}-hex-color-input`;

  return (
    <Wrapper ref={ref} {...others}>
      <HexColorPicker color={color} onChange={onChange} />
      <HexInputSection>
        <Label htmlFor={inputId}>Hex</Label>
        <InputWrapper>
          <HexColorInput id={inputId} color={color} onChange={onChange} />
        </InputWrapper>
      </HexInputSection>
    </Wrapper>
  );
}

export default forwardRef<HTMLDivElement, ColorPickerProps>(ColorPicker);

const Wrapper = styled.div`
  &&& {
    width: 200px;

    border-radius: 16px;
    box-shadow: var(--box-shadow);
    padding-bottom: 16px;
    background-color: white;
    /* I want react colorful fit inside wrapper */
    overflow: hidden;
  }

  /* === Override React colorful === */

  & .react-colorful {
    width: 100%;
    aspect-ratio: 1;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
  }

  & .react-colorful__hue {
    height: 14px;
    margin: 10px 12px;
    border-radius: 7px;
  }

  & .react-colorful__saturation {
    border-radius: inherit;
  }

  & .react-colorful__pointer {
    width: 14px;
    height: 14px;
  }
`;

const HexInputSection = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
`;

const Label = styled.label`
  margin-right: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  flex: 1;

  & input {
    width: 100%;
    height: 24px;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid var(--color-secondary);

    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }
`;
