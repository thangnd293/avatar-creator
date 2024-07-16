import {
  type Artboard,
  type File,
  type Renderer,
  type RiveCanvas,
  type StateMachineInstance,
} from "@rive-app/canvas-advanced";

import { CanvasDimensions, RenderRequest } from "@/types";
import { RiveFile, RuntimeLoader } from "@rive-app/react-canvas-lite";

export class RiveAdvanced {
  private cleanedUp: boolean;
  private pendingRequests: RenderRequest[];
  private rendererState: "initializing" | "drawing" | "idle";
  private currentRequest?: RenderRequest;
  private riveCanvas: HTMLCanvasElement;
  private riveFile: RiveFile;
  private stateMachineName: string;
  private initialStates: Record<string, number>;
  private baseStates: Record<string, number>;
  private riveInstance!: RiveCanvas;
  private fileInstance!: File;
  private renderer!: Renderer;
  private artboard!: Artboard;
  private machine!: StateMachineInstance;

  requestRenderOnCanvas: (request: RenderRequest) => {
    discardRequest: () => void;
  };

  updateBaseState: (baseStates: Record<string, number>) => void;

  cleanUp: () => void;

  drawOntoCanvas: (canvas: HTMLCanvasElement) => void;

  setRiveInputs: (states: Record<string, number>) => void;

  containsChangedState: (inputs: Record<string, number>) => boolean;

  initialize: () => void;

  advance: (elapsedTime: number) => void;

  update: (elapsedTime: number) => void;

  constructor(
    canvasDimensions: CanvasDimensions,
    initialStates: Record<string, number>,
    riveFile: RiveFile,
    stateMachineName: string
  ) {
    this.cleanedUp = false;
    this.pendingRequests = [];
    this.rendererState = "initializing";
    this.currentRequest = undefined;
    this.riveCanvas = document.createElement("canvas");
    this.riveCanvas.width = canvasDimensions.width;
    this.riveCanvas.height = canvasDimensions.height;
    this.riveFile = riveFile;
    this.stateMachineName = stateMachineName;
    this.initialStates = initialStates;
    this.baseStates = {};
    // Add request render to queue
    this.requestRenderOnCanvas = (newRequest) => {
      this.pendingRequests.push(newRequest);
      return {
        discardRequest: () => {
          this.pendingRequests = this.pendingRequests.filter(
            (request) => request !== newRequest
          );
        },
      };
    };

    this.updateBaseState = (baseStates) => {
      this.pendingRequests = [];
      this.baseStates = baseStates;
    };

    // Set flag to clean up instances
    this.cleanUp = () => {
      this.cleanedUp = true;
    };

    // Draw current rive canvas into dom canvas
    this.drawOntoCanvas = (canvas) => {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          this.riveCanvas,
          0,
          0,
          this.riveCanvas.width,
          this.riveCanvas.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
      } else {
        console.error("Tried to draw onto canvas without a context.", {
          once: true,
        });
      }
    };

    // Update machine inputs
    this.setRiveInputs = (states) => {
      const newStates = { ...this.baseStates, ...states };
      if (!this.containsChangedState(newStates)) return;
      this.rendererState = "drawing";

      const inputCount = this.machine.inputCount();
      for (let i = 0; i < inputCount; i++) {
        const inputName = this.machine.input(i).name;
        if (newStates[inputName] !== undefined) {
          this.machine.input(i).asNumber().value = newStates[inputName];
        }
      }
    };

    // Check if inputs have changed compared to the current state
    this.containsChangedState = (inputs) => {
      const inputCount = this.machine.inputCount();
      for (let i = 0; i < inputCount; i++) {
        const inputName = this.machine.input(i).name;
        const inputValue = this.machine.input(i).asNumber().value;
        if (
          inputs[inputName] !== undefined &&
          inputValue !== inputs[inputName]
        ) {
          return true;
        }
      }
      return false;
    };

    // Initialize rive, file, artboard, renderer, and machine instance
    this.initialize = async () => {
      this.riveInstance = await RuntimeLoader.awaitInstance();

      if (this.cleanedUp) {
        this.riveInstance.cleanup();
        return;
      }

      if (this.cleanedUp) {
        this.riveInstance.cleanup();
        return;
      }

      this.fileInstance = this.riveFile.getInstance();

      if (this.cleanedUp) {
        this.riveInstance.cleanup();
        this.fileInstance.delete();
        return;
      }

      this.renderer = this.riveInstance.makeRenderer(this.riveCanvas);
      this.artboard = this.fileInstance.defaultArtboard();
      this.machine = new this.riveInstance.StateMachineInstance(
        this.artboard.stateMachineByName(this.stateMachineName),
        this.artboard
      );

      this.update(0);
    };

    this.advance = (elapsedTime) => {
      this.machine.advance(elapsedTime);
      this.artboard.advance(elapsedTime);
      this.renderer.save();
      this.renderer.align(
        this.riveInstance.Fit.cover,
        this.riveInstance.Alignment.center,
        {
          maxX: this.riveCanvas.width,
          maxY: this.riveCanvas.height,
          minX: 0,
          minY: 0,
        },
        this.artboard.bounds
      );
      this.artboard.draw(this.renderer);
      this.renderer.restore();
    };

    this.update = (elapsedTime) => {
      if (this.cleanedUp) {
        this.riveInstance.cleanup();
        this.fileInstance.delete();
        this.renderer.delete();
        this.artboard.delete();
        this.machine.delete();
        return;
      }

      if (this.rendererState === "idle") {
        if (this.currentRequest !== undefined) {
          this.drawOntoCanvas(this.currentRequest.canvas);
          this.currentRequest.callback?.();
          this.currentRequest = undefined;
        }

        const nextRequest = this.pendingRequests.shift();
        if (nextRequest !== undefined) {
          this.currentRequest = nextRequest;
          this.setRiveInputs(nextRequest.statesToOverride);
        }
      }

      this.renderer.clear();
      this.advance(elapsedTime);

      if (this.machine.stateChangedCount() > 0) {
        if (this.rendererState === "drawing") {
          this.rendererState = "idle";
        } else if (this.rendererState === "initializing") {
          this.setRiveInputs(this.initialStates);
          this.rendererState = "drawing";
        }
      }

      this.riveInstance.requestAnimationFrame(this.update);
    };

    this.initialize();
  }
}
