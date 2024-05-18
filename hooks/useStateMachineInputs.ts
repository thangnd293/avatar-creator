import { type Rive } from "@rive-app/react-canvas";

export function useStateMachineInputs(rive: Rive | null, stateMachine: string) {
  return rive?.stateMachineInputs(stateMachine);
}
