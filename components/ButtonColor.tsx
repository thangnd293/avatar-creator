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
  const style: Record<string, string> = {
    "--color": color,
  };

  return <Button ref={ref} style={style} $active={active} {...others} />;
}

export default forwardRef<HTMLButtonElement, ButtonColorProps>(ButtonColor);

const Button = styled.button<{
  $active?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  border: 4px solid transparent;
  flex-shrink: 0;
  background-color: white;
  transition: border-color 0.2s;
  box-shadow: var(--box-shadow);

  &:hover {
    border-color: var(--color-secondary);
  }

  &::before {
    content: "";
    display: block;
    width: 60%;
    height: 60%;
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
