"use client";

import React, { createContext, useCallback, useContext, useMemo } from "react";

import { DEFAULT_AVATAR } from "@/constants/avatar";

interface AvatarContext {
  avatarStates: Record<string, number>;
  changeAvatarState: (key: string, value: number) => void;
}

const AvatarContext = createContext<AvatarContext | null>(null);

export function useAvatarStates() {
  const context = useContext(AvatarContext);
  if (!context)
    throw new Error("useAvatarStates must be used within AvatarStatesProvider");
  return context;
}

interface AvatarStatesProviderProps {
  initialStates?: Record<string, number>;
  children: React.ReactNode;
}

export default function AvatarStatesProvider({
  initialStates,
  children,
}: AvatarStatesProviderProps) {
  const [avatarStates, setCurrentStates] = React.useState<
    Record<string, number>
  >(initialStates || DEFAULT_AVATAR);

  const changeAvatarState = useCallback((key: string, value: number) => {
    setCurrentStates((prevStates) => {
      if (prevStates[key] === value) return prevStates;

      return {
        ...prevStates,
        [key]: value,
      };
    });
  }, []);

  const value = useMemo(
    () => ({ avatarStates, changeAvatarState }),
    [avatarStates, changeAvatarState]
  );

  return (
    <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>
  );
}
