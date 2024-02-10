import * as React from "react";

import { cn } from "@/lib/ui-utils";
import { Button } from "../button";
import { Minus, Plus } from "lucide-react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export type NumberInputProps = Omit<InputProps, "type">;

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, value, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current!, []);
    const handleStepUp = React.useCallback(() => {
      innerRef.current?.stepUp();
      innerRef.current?.dispatchEvent(new Event("change", { bubbles: true }));
    }, []);
    const handleStepDown = React.useCallback(() => {
      innerRef.current?.stepDown();
      innerRef.current?.dispatchEvent(new Event("change", { bubbles: true }));
    }, []);
    return (
      <div className="relative flex gap-2">
        <Button
          className="absolute"
          variant="ghost"
          shape="square"
          onClick={handleStepDown}
        >
          <Minus className="h-5 w-5" />
        </Button>
        <Button
          className="absolute right-0"
          variant="ghost"
          shape="square"
          onClick={handleStepUp}
        >
          <Plus className="h-5 w-5" />
        </Button>
        <Input
          type="number"
          className={cn(
            "px-10 text-center [appearance:none] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className,
          )}
          value={String(value)}
          ref={innerRef}
          {...props}
        />
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

export { Input, NumberInput };
