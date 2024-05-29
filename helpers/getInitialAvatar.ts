import "server-only";

import { cookies } from "next/headers";

export function getInitialAvatar() {
  const avatarStates = cookies().get("avatarStates")?.value;

  if (typeof avatarStates === "string") {
    return JSON.parse(avatarStates);
  }
}
