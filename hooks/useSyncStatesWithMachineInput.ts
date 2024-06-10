import { StateMachineInput } from "@rive-app/react-canvas-lite";
import { useEffect } from "react";

export function useSyncStatesWithMachineInput(
  states: Record<string, number>,
  machineInputs?: StateMachineInput[]
) {
  useEffect(() => {
    if (!machineInputs) return;

    machineInputs.forEach((input) => {
      if (states[input.name] !== undefined) input.value = states[input.name];
    });
  }, [machineInputs, states]);
}
