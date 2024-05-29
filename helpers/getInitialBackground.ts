import 'server-only'

import { DEFAULT_BACKGROUND_COLOR } from "@/constants/avatar";
import { cookies } from "next/headers";

export function getInitialBackground() {
  return cookies().get("background")?.value || DEFAULT_BACKGROUND_COLOR;
}
