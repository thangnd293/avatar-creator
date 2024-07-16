"use client";

import styled from "styled-components";

import { useAvatarStates } from "@/components/AvatarStatesProvider";
import { MACHINE_STATE } from "@/constants/rive";
import { RiveAdvanced } from "@/lib/rive";
import { useAvatarRiveFile } from "../AvatarRiveFileProvider";
import Icons from "../Icons";

const IMAGE_SIZE = 512;

function DownloadButton() {
  const { avatarStates } = useAvatarStates();
  const { isLoading, riveFile } = useAvatarRiveFile();

  const handleDownload = () => {
    if (isLoading || !riveFile) return;

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
      <Icons type="Download" width={20} height={20} strokeWidth={2} /> Download
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
  gap: 10px;
  font-weight: var(--weight-bold);
  height: 100%;
  padding: 0 20px;
  transition: color 100ms;
  user-select: none;

  &:hover {
    background-color: var(--color-primary-light);
  }
`;
