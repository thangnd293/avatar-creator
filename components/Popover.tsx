import * as React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import styled from "styled-components";
import {
  slideDownAndFade,
  slideLeftAndFade,
  slideUpAndFade,
  slideRightAndFade,
} from "@/keyframes";

const Popover = RadixPopover.Root;

const PopoverTrigger = RadixPopover.Trigger;

const PopoverContentWrapper = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(({ align = "center", sideOffset = 4, ...props }, ref) => (
  <RadixPopover.Portal>
    <PopoverContent
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      {...props}
    />
  </RadixPopover.Portal>
));

PopoverContentWrapper.displayName = "PopoverContentWrapper";

export { Popover, PopoverTrigger, PopoverContentWrapper };

const PopoverContent = styled(RadixPopover.Content)`
  border-radius: 4px;
  width: 260px;
  background-color: white;
  box-shadow: hsl(206, 22%, 7% / 35%) 0px 10px 38px -10px,
    hsl(206, 22%, 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state="open"] {
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

  &:focus {
    box-shadow: hsl(206, 22%, 7% / 35%) 0px 10px 38px -10px,
      hsl(206, 22%, 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px red; // Adjust according to your theme
  }
`;
