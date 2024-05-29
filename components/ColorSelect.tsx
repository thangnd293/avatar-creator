"use client";

import { Fragment, useState } from "react";
import styled, { css } from "styled-components";
import { X } from "react-feather";

import { ButtonColorInfo } from "@/types";
import Tooltip from "./Tooltip";
import ButtonColor from "./ButtonColor";
import VisuallyHidden from "./VisuallyHidden";
import ScrollArea from "./ScrollArea";
import { QUERIES } from "@/constants/styles";

interface ColorSelectProps {
  className?: string;
  options: ButtonColorInfo[];
  value: number;
  onChange: (color: number) => void;
}
function ColorSelect({
  className,
  value,
  options,
  onChange,
}: ColorSelectProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentColor = options.find((color) => color.value === value);

  return (
    <Wrapper
      className={className}
      style={{
        "--spacing": isExpanded ? "-16px" : undefined,
      }}
    >
      {isExpanded && (
        <Fragment>
          <CollapseButton onClick={() => setIsExpanded(false)}>
            <X />
            <VisuallyHidden>Close color select</VisuallyHidden>
          </CollapseButton>

          <LimitWidthScrollArea>
            <ColorsWrapper>
              {options.map((option) => (
                <ButtonColor
                  key={option.value}
                  color={option.color}
                  active={option.value === value}
                  onClick={() => onChange(option.value)}
                />
              ))}
            </ColorsWrapper>
          </LimitWidthScrollArea>
        </Fragment>
      )}

      {!isExpanded && (
        <Tooltip title={options[0].state}>
          <ButtonColor
            color={currentColor?.color || "transparent"}
            onClick={() => setIsExpanded(true)}
          />
        </Tooltip>
      )}
    </Wrapper>
  );
}

export default ColorSelect;

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: var(--spacing);
`;

const CollapseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--button-color-size);
  height: var(--button-color-size);
  border-radius: 16px;
  border: none;
  cursor: pointer;
  color: var(--color-gray-900);
  background-color: var(--color-white);
  box-shadow: var(--box-shadow);

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
`;

const ColorsWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 16px;
`;

const LimitWidthScrollArea = styled(ScrollArea)`
  max-width: 75vw;

  @media ${QUERIES.tabletAndSmaller} {
    max-width: 60vw;
  }

  @media ${QUERIES.phoneAndSmaller} {
    max-width: 40vw;
  }
`;
