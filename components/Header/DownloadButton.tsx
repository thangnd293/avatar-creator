"use client";

import { DownloadCloud } from "react-feather";
import styled from "styled-components";

import { useAvatarStates } from "@/components/AvatarStatesProvider";
import { MACHINE_STATE } from "@/constants/rive";
import { RiveAdvanced } from "@/lib/rive";
import { useAvatarRiveFile } from "../AvatarRiveFileProvider";

const IMAGE_SIZE = 512;

function DownloadButton() {
  const { avatarStates } = useAvatarStates();
  const riveFile = useAvatarRiveFile();

  const handleDownload = () => {
    const { requestRenderOnCanvas, cleanUp } = new RiveAdvanced(
      {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
      },
      avatarStates,
      riveFile,
      MACHINE_STATE.Avatar
    );

    const canvas = document.createElement("canvas");
    canvas.width = IMAGE_SIZE;
    canvas.height = IMAGE_SIZE;

    requestRenderOnCanvas({
      canvas,
      statesToOverride: avatarStates,
      callback: () => {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "avatar.png";
        link.href = dataUrl;
        link.click();

        cleanUp();
      },
    });
  };

  return (
    <Wrapper onClick={handleDownload}>
      <DownloadCloud size={18} strokeWidth={3} /> Download
    </Wrapper>
  );
}

export default DownloadButton;

const Wrapper = styled.button`
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
