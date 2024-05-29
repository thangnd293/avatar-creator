"use client";

import { useScreenshot } from "@/hooks";
import { DownloadCloud } from "react-feather";
import styled from "styled-components";

function Header() {
  const { downloadScreenshot } = useScreenshot("main-avatar", {
    backgroundColor: null,
    filename: "avator.png",
  });

  return (
    <Wrapper>
      <h1>Avator</h1>
      <Button onClick={downloadScreenshot}>
        <DownloadCloud size={18} strokeWidth={3} /> Take snap
      </Button>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.75rem;
  flex-shrink: 0;
`;

const Button = styled.button`
  background-color: var(--color-primary);
  border-radius: 10px;
  border: none;
  color: var(--color-white);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: var(--weight-bold);
  height: 100%;
  padding: 0 20px;
  transition: color 100ms;
  user-select: none;

  &:hover {
    background-color: var(--color-primary-light);
  }
`;
