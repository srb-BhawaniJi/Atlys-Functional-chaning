import React from "react";
import { InputWithRadioStyles } from "../style";

type Props = {
  title: string;
  value: number;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOutput?: boolean;
  inputRef?: React.Ref<HTMLDivElement>;
  outputRef?: React.Ref<HTMLDivElement>;
};

const InputWithRadio = ({
  title,
  value,
  handleInputChange,
  isOutput,
  inputRef,
  outputRef,
}: Props) => {
  return (
    <InputWithRadioStyles className={isOutput ? "output" : ""}>
      <div className="text">{title}</div>
      <div className="vals">
        {isOutput ? (
          <>
            <span className="custom-radio" ref={outputRef}></span>
            <input
              type="number"
              value={value}
              className="val-number"
              readOnly
            />
          </>
        ) : (
          <>
            <input
              type="number"
              value={value}
              onChange={handleInputChange}
              className="val-number"
            />
            <span className="custom-radio" ref={inputRef}></span>
          </>
        )}
      </div>
    </InputWithRadioStyles>
  );
};

export default InputWithRadio;
