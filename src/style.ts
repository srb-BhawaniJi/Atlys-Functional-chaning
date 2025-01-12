import { styled } from "styled-components";
import { StylesConfig, GroupBase } from "react-select";

export const AppContainerStyles = styled.div`
  font-family: "Inter";
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 96px;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9fafb;

  /* Chrome, Safari, Edge, Opera */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  .top-section {
    display: flex;
    flex-direction: row;
    gap: 96px;
    align-items: flex-end;
  }

  .bottom-section {
    display: flex;
    flex-direction: row;
    gap: 96px;
  }
`;

export const FunctionContainerStyles = styled.div`
  background-color: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px 24px 15px 24px;
  width: 235px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 17px;
    color: #a5a5a5;
    font-weight: 600;
  }

  .equation {
    display: flex;
    flex-direction: column;
    gap: 4px;
    .label {
      font-size: 12px;
      font-weight: 500;
      color: #252525;
      line-height: 15px;
    }
    .inputBox {
      border-radius: 8px;
      border: 1px solid #d3d3d3;
      padding: 8px 10px;
      line-height: 15px;
      font-size: 12px;
    }
  }

  .radio-btns {
    display: flex;
    justify-content: space-between;
  }
`;

export const customStyles: StylesConfig<any, false, GroupBase<any>> = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #d3d3d3",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 500,
    backgroundColor: "#f5f5f5",
    cursor: state.isDisabled ? "no-drop" : "pointer",
    boxShadow: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

export const RadioWithLabelStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;

  .custom-radio-label {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }

  .custom-radio-input {
    display: none;
  }

  .custom-radio {
    width: 15px;
    height: 15px;
    border: 2px solid #dbdbdb;
    border-radius: 50%;
    display: inline-block;
    position: relative;
  }

  .custom-radio::after {
    content: "";
    width: 10px;
    height: 10px;
    background-color: #4a90e2;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .custom-radio-text {
    font-size: 10px;
    color: #585757;
    font-weight: 500;
  }
`;

export const InputWithRadioStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 115px;
  margin: 0 -86px;

  .text {
    background-color: #e29a2d;
    color: #fff;
    padding: 4px 12px;
    border-radius: 14px;
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
  }
  .vals {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 2px solid #f6c77f;
    border-radius: 12px;
    padding: 13px 12px;
    gap: 10px;
    width: -webkit-fill-available;
    position: relative;

    .val-number {
      border: none;
      font-size: 18px;
      font-weight: 700;
      width: 40px;
      text-align: center;
      background-color: transparent;
      outline: none;
    }

    input[type="radio"] {
      margin: 0 0 0 12px;
    }

    .custom-radio-input {
      display: none;
    }

    .custom-radio {
      width: 15px;
      height: 15px;
      border: 2px solid #dbdbdb;
      border-radius: 50%;
      display: inline-block;
      position: relative;
    }

    .custom-radio::after {
      content: "";
      width: 10px;
      height: 10px;
      background-color: #4a90e2;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &::after {
      content: "";
      height: 99%;
      width: 1px;
      background-color: #f6c77f;
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &.output {
    .text {
      background-color: #4caf79;
    }
    .vals {
      border: 2px solid #2dd179;
      &::after {
        background-color: #2dd179;
        left: 40px;
        right: 0;
      }
    }
  }
`;
