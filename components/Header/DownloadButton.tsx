"use client";

import { useScreenshot } from "@/hooks";
import { DownloadCloud } from "react-feather";
import styled from "styled-components";

function DownloadButton() {
  const { downloadScreenshot } = useScreenshot("main-avatar", {
    filename: "avator.png",
    canvasWidth: 512,
    canvasHeight: 512,
  });

  return (
    <Button onClick={downloadScreenshot}>
      <DownloadCloud size={18} strokeWidth={3} /> Download
    </Button>
  );
}

export default DownloadButton;

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
