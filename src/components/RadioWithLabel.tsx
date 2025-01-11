import React from "react";
import { RadioWithLabelStyles } from "../style";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  inputRef?: React.Ref<HTMLDivElement>;
  outputRef?: React.Ref<HTMLDivElement>;
};

const RadioWithLabel: React.FC<Props> = ({ options, inputRef, outputRef }) => {
  return (
    <RadioWithLabelStyles>
      {options.map((option: Option, index) => (
        <label key={option.value} className="custom-radio-label">
          {index === 1 && (
            <span className="custom-radio-text">{option.label}</span>
          )}
          <input
            type="radio"
            value={option.value}
            className="custom-radio-input"
            defaultChecked
          />
          <span
            className="custom-radio"
            ref={index === 0 ? inputRef : outputRef}
          ></span>
          {index === 0 && (
            <span className="custom-radio-text">{option.label}</span>
          )}
        </label>
      ))}
    </RadioWithLabelStyles>
  );
};

export default RadioWithLabel;
