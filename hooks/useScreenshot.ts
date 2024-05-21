import html2canvas, { Options as HTML2CanvasOptions } from "html2canvas";
import { useState } from "react";

type Options = HTML2CanvasOptions & {
  filename: string;
};

export function useScreenshot(
  element: HTMLElement | string,
  options?: Partial<Options>
) {
  const { filename = "image.png", ...html2canvasOptions } = options || {};

  const [screenshot, setScreenshot] = useState<string | null>(null);

  const downloadScreenshot = () => {
    const _element =
      typeof element === "string" ? document.getElementById(element) : element;

    if (_element) {
      html2canvas(_element, html2canvasOptions).then((canvas) => {
        const link = document.createElement("a");
        link.download = filename;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  const takeScreenshot = () => {
    const _element =
      typeof element === "string" ? document.getElementById(element) : element;

    if (_element) {
      html2canvas(_element, html2canvasOptions).then((canvas) => {
        setScreenshot(canvas.toDataURL("image/png"));
      });
    }
  };

  return { screenshot, takeScreenshot, downloadScreenshot };
}
