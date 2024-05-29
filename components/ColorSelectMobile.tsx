"use client";

import styled from "styled-components";

import { QUERIES } from "@/constants/styles";
import { ButtonColorInfo } from "@/types";
import ButtonColor from "./ButtonColor";

interface ColorSelectMobileProps {
  title: string;
  options: ButtonColorInfo[];
  value: number;
  onChange: (color: number) => void;
}

function ColorSelectMobile({
  title,
  value,
  options,
  onChange,
}: ColorSelectMobileProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ColorOptions>
        {options.map((option) => (
          <ButtonColor
            key={option.value}
            color={option.color}
            active={option.value === value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </ColorOptions>
    </Wrapper>
  );
}

export default ColorSelectMobile;

const Wrapper = styled.div`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    display: revert;
  }
`;

const Title = styled.h3`
  color: var(--color-gray-700);
  font-weight: var(--weight-bold);
  margin-bottom: 16px;
`;

const ColorOptions = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--button-color-size), 1fr)
  );
  justify-items: center;
`;
