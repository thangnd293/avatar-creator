"use client";

import { RiveFile, useRiveFile } from "@rive-app/react-canvas-lite";
import { PropsWithChildren, createContext, useContext } from "react";
import styled from "styled-components";

import { RIVE_FILE } from "@/constants/rive";

const AvatarRiveFileContext = createContext<RiveFile | null>(null);

export const useAvatarRiveFile = () => {
  const context = useContext(AvatarRiveFileContext);

  if (!context)
    throw new Error(
      "useAvatarRiveFile must be used within AvatarRiveFileProvider"
    );

  return context;
};

export default function AvatarRiveFileProvider({
  children,
}: PropsWithChildren) {
  const { status, riveFile } = useRiveFile({
    src: RIVE_FILE,
  });

  if (status === "failed") {
    throw new Error("Failed to load Rive file");
  }

  if (status !== "success" || !riveFile) {
    // TODO: Add a better loading state
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  return (
    <AvatarRiveFileContext.Provider value={riveFile}>
      {children}
    </AvatarRiveFileContext.Provider>
  );
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background-color: var(--color-white);
`;
