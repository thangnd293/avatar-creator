import React, { forwardRef } from "react";
import styled, { css } from "styled-components";

interface ButtonColorProps extends React.ComponentProps<"button"> {
  active?: boolean;
  color: string;
}
function ButtonColor(
  { color, active, ...others }: ButtonColorProps,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <Button
      ref={ref}
      style={{
        "--color": color,
      }}
      $active={active}
      {...others}
    />
  );
}

export default forwardRef<HTMLButtonElement, ButtonColorProps>(ButtonColor);

const Button = styled.button<{
  $active?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--button-color-size);
  height: var(--button-color-size);
  border-radius: 16px;
  border: none;
  cursor: pointer;
  border: 4px solid transparent;
  flex-shrink: 0;
  background-color: var(--color-white);
  transition: border-color 0.2s;
  box-shadow: var(--box-shadow);

  &:hover {
    border-color: var(--color-secondary);
  }

  &::before {
    content: "";
    display: block;
    width: 70%;
    height: 70%;
    background-color: var(--color);
    border-radius: 8px;
  }

  ${({ $active }) =>
    $active &&
    css`
      border-color: var(--color-primary);

      &:hover {
        border-color: var(--color-primary);
      }
    `}
`;
