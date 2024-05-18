import React, { forwardRef } from "react";
import styled from "styled-components";

interface ButtonColorProps extends React.ComponentProps<"button"> {
  active?: boolean;
  color: string;
}
function ButtonColor(
  { color, ...others }: ButtonColorProps,
  ref: React.Ref<HTMLButtonElement>
) {
  return <Button ref={ref} $color={color} {...others} />;
}

export default forwardRef<HTMLButtonElement, ButtonColorProps>(ButtonColor);

const Button = styled.button<{
  $color: string;
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
  box-shadow: var(--box-shadow);
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--secondary-color);
  }

  &::before {
    content: "";
    display: block;
    width: 60%;
    height: 60%;
    background-color: ${({ $color }) => $color};
    border-radius: 8px;
  }

  ${({ $active }) =>
    $active &&
    `
        border-color: var(--primary-color) !important;
      `}
`;
