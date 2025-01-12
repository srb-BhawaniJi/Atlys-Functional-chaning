import React, { forwardRef, useRef } from "react";
import { customStyles, FunctionContainerStyles } from "../style";
import Select from "react-select";
import MemoFunctionSVG from "./FunctionIcon";
import RadioWithLabel from "./RadioWithLabel";
import { equationRegex } from "../constant";

interface FunctionCardProps {
  index: number;
  equation: string;
  setEquation: (eq: string) => void;
  nextFunction: { label: string; value: string };
  inputRef?: React.Ref<HTMLDivElement>;
  outputRef?: React.Ref<HTMLDivElement>;
}

const FunctionContainer = forwardRef<HTMLDivElement, FunctionCardProps>(
  (
    { index, equation, setEquation, nextFunction, inputRef, outputRef },
    ref
  ) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEquation(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowedKeys: string[] = [
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Tab",
      ];

      if (!allowedKeys.includes(e.key) && !equationRegex.test(e.key)) {
        e.preventDefault();
      }
    };

    return (
      <FunctionContainerStyles ref={ref}>
        <div className="header">
          <MemoFunctionSVG />
          <span>Function: {index}</span>
        </div>
        <div className="equation">
          <span className="label">Equation</span>
          <input
            className="inputBox"
            type="text"
            value={equation}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="equation">
          <span className="label">Next Function</span>
          <Select value={nextFunction} isDisabled styles={customStyles} />
        </div>
        <RadioWithLabel
          options={[
            { label: "input", value: "input" },
            { label: "output", value: "output" },
          ]}
          inputRef={inputRef}
          outputRef={outputRef}
        />
      </FunctionContainerStyles>
    );
  }
);

export default FunctionContainer;
