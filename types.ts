export type ButtonTypeInfo = {
  state: string;
  value: number;
  statesToOverride: Record<string, number>;
};

export type ButtonColorInfo = {
  color: string;
  state: string;
  value: number;
};

export type RenderRequest = {
  canvas: HTMLCanvasElement;
  statesToOverride: Record<string, number>;
  callback?: () => void;
};

export type CanvasDimensions = {
  width: number;
  height: number;
};
