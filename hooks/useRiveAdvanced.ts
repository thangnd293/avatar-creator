import { RiveAdvanced } from "@/lib/rive";
import { RenderRequest } from "@/types";
import { useCallback, useLayoutEffect, useRef } from "react";

interface RiveAdvancedArgs {
  canvasDimensions: {
    width: number;
    height: number;
  };
  initialStates: Record<string, number>;
  riveFile: string;
  stateMachine: string;
}

export function useRiveAdvanced(args: RiveAdvancedArgs) {
  const instance = useInstanceRiveAdvanced(args);

  const requestRenderOnCanvas = useCallback((renderRequest: RenderRequest) => {
    if (instance.current) {
      return instance.current.requestRenderOnCanvas(renderRequest);
    }

    console.error("RiveAdvanced instance is not initialized");
  }, []);

  const updateBaseState = useCallback((newStates: Record<string, number>) => {
    if (instance.current) {
      instance.current.updateBaseState(newStates);
    }

    console.error("RiveAdvanced instance is not initialized");
  }, []);

  return {
    requestRenderOnCanvas,
    updateBaseState,
  };
}

const useInstanceRiveAdvanced = ({
  canvasDimensions,
  initialStates,
  riveFile,
  stateMachine,
}: RiveAdvancedArgs) => {
  const ref = useRef<RiveAdvanced | null>(null);

  useLayoutEffect(() => {
    ref.current = new RiveAdvanced(
      canvasDimensions,
      initialStates,
      riveFile,
      stateMachine
    );

    return () => {
      ref.current?.cleanUp();
    };
  }, []);

  return ref;
};
