import {
  slideDownAndFade,
  slideLeftAndFade,
  slideRightAndFade,
  slideUpAndFade,
} from "@/keyframes";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import styled from "styled-components";

interface TooltipProps {
  title: string;
  children: React.ReactNode;
}
export default function Tooltip({ title, children }: TooltipProps) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <Wrapper>{children}</Wrapper>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <TooltipContent sideOffset={5}>{title}</TooltipContent>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

const Wrapper = styled.div`
  display: inline-block;
`;

const TooltipContent = styled(RadixTooltip.Content)`
  border-radius: 8px;
  padding: 14px 18px;
  font-size: 15px;
  line-height: 1;
  color: white;
  background-color: rgba(97, 97, 97, 0.92);
  box-shadow: hsl(206, 22%, 7% / 35%) 0px 10px 38px -10px,
    hsl(206, 22%, 7% / 20%) 0px 10px 20px -15px;
  user-select: none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state="delayed-open"] {
    &[data-side="top"] {
      animation-name: ${slideDownAndFade};
    }
    &[data-side="right"] {
      animation-name: ${slideLeftAndFade};
    }
    &[data-side="bottom"] {
      animation-name: ${slideUpAndFade};
    }
    &[data-side="left"] {
      animation-name: ${slideRightAndFade};
    }
  }
`;
