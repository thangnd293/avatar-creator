"use client";

import { RiveFile, useRiveFile } from "@rive-app/react-canvas-lite";
import { PropsWithChildren, createContext, useContext, useMemo } from "react";

import { RIVE_FILE } from "@/constants/rive";

type AvatarRiveFileContext =
  | {
      riveFile: null;
      isLoading: true;
    }
  | {
      riveFile: RiveFile;
      isLoading: false;
    };
const AvatarRiveFileContext = createContext<AvatarRiveFileContext | null>(null);

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

  const value: AvatarRiveFileContext = useMemo(() => {
    if (status === "loading" || !riveFile) {
      return { riveFile: null, isLoading: true };
    }

    return { riveFile: riveFile, isLoading: false };
  }, [status, riveFile]);

  return (
    <AvatarRiveFileContext.Provider value={value}>
      {children}
    </AvatarRiveFileContext.Provider>
  );
}
