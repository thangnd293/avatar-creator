import { toPng } from "html-to-image";
import { Options as LibOptions } from "html-to-image/lib/types";

type Options = LibOptions & {
  filename: string;
};

export function useScreenshot(
  element: HTMLElement | string,
  options?: Partial<Options>
) {
  const { filename = "avator.png", ...config } = options || {};

  const downloadScreenshot = () => {
    const _element =
      typeof element === "string" ? document.getElementById(element) : element;

    if (_element) {
      toPng(_element, config)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = filename;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return { downloadScreenshot };
}
