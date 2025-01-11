import React, { useEffect, useRef, useState } from "react";
import FunctionContainer from "./components/FunctionContainer";
import InputWithRadio from "./components/InputWithRadio";
import { equationRegex } from "./constant";
import { AppContainerStyles } from "./style";

const App: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number>(2);
  const [functions, setFunctions] = useState<string[]>([
    "x^2",
    "2*x+4",
    "x^2+20",
    "x-2",
    "x/2",
  ]);
  const [finalOutput, setFinalOutput] = useState<number>(0);
  const [errors, setErrors] = useState<boolean[]>([]);
  const inputRadioRef = useRef<HTMLDivElement | null>(null);
  const outputRadioRef = useRef<HTMLDivElement | null>(null);

  const functionRefs = useRef<
    {
      input: HTMLDivElement | null;
      output: HTMLDivElement | null;
    }[]
  >([]);

  const [lines, setLines] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([]);

  const updateLines = () => {
    const newLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const executionOrder = [0, 1, 3, 4, 2]; // Order of function execution

    // Connect input radio of InputWithRadio to the first FunctionContainer
    const inputRect = inputRadioRef.current?.getBoundingClientRect();
    const firstInputRect =
      functionRefs.current[executionOrder[0]]?.input?.getBoundingClientRect();
    if (inputRect && firstInputRect) {
      newLines.push({
        x1: inputRect.left + inputRect.width / 2,
        y1: inputRect.top + inputRect.height / 2,
        x2: firstInputRect.left + firstInputRect.width / 2,
        y2: firstInputRect.top + firstInputRect.height / 2,
      });
    }

    // Connect the last FunctionContainer's output to the output radio of InputWithRadio
    const lastOutputRect =
      functionRefs.current[
        executionOrder[executionOrder.length - 1]
      ]?.output?.getBoundingClientRect();
    const outputRect = outputRadioRef.current?.getBoundingClientRect();
    if (lastOutputRect && outputRect) {
      newLines.push({
        x1: lastOutputRect.left + lastOutputRect.width / 2,
        y1: lastOutputRect.top + lastOutputRect.height / 2,
        x2: outputRect.left + outputRect.width / 2,
        y2: outputRect.top + outputRect.height / 2,
      });
    }

    // Connect all FunctionContainer components as before
    for (let i = 0; i < executionOrder.length - 1; i++) {
      const current = functionRefs.current[executionOrder[i]];
      const next = functionRefs.current[executionOrder[i + 1]];

      if (current?.output && next?.input) {
        const currentRect = current.output.getBoundingClientRect();
        const nextRect = next.input.getBoundingClientRect();

        newLines.push({
          x1: currentRect.left + currentRect.width / 2,
          y1: currentRect.top + currentRect.height / 2,
          x2: nextRect.left + nextRect.width / 2,
          y2: nextRect.top + nextRect.height / 2,
        });
      }
    }
    setLines(newLines);
  };

  useEffect(() => {
    updateLines();
    window.addEventListener("resize", updateLines);

    return () => {
      window.removeEventListener("resize", updateLines);
    };
  }, []);

  useEffect(() => {
    updateLines();
    window.addEventListener("resize", updateLines);

    return () => {
      window.removeEventListener("resize", updateLines);
    };
  }, [functions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialValue(Number(e.target.value));
  };

  const handleEquationChange = (index: number, newEquation: string) => {
    const updatedFunctions = [...functions];
    const isValid = equationRegex.test(newEquation);

    const updatedErrors = [...errors];
    updatedErrors[index] = !isValid;

    setErrors(updatedErrors);

    if (isValid) {
      updatedFunctions[index] = newEquation;
      setFunctions(updatedFunctions);
    }
  };

  const evaluateEquation = (equation: string, x: number): number => {
    try {
      const sanitizedEquation = equation.replace(/\^/g, "**");
      const functionBody = new Function("x", `return ${sanitizedEquation}`);
      return functionBody(x);
    } catch (error) {
      console.error("Error evaluating equation:", error);
      return 0;
    }
  };

  const calculateOutput = (): number => {
    try {
      let result = initialValue;
      const executionOrder = [0, 1, 3, 4, 2];
      executionOrder.forEach((index) => {
        if (!errors[index]) {
          result = evaluateEquation(functions[index], result);
        }
      });
      return result;
    } catch (error) {
      console.error("Error in calculation:", error);
      return 0;
    }
  };

  useEffect(() => {
    setFinalOutput(calculateOutput());
  }, [initialValue, functions]);

  return (
    <AppContainerStyles>
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#ccc"
            strokeWidth={2}
            strokeDasharray="4" // Makes the line dotted
          />
        ))}
      </svg>

      <div className={"top-section"}>
        <InputWithRadio
          title={"Initial value of x"}
          value={initialValue}
          handleInputChange={handleInputChange}
          inputRef={inputRadioRef}
        />
        <FunctionContainer
          index={1}
          equation={functions[0]}
          setEquation={(eq) => handleEquationChange(0, eq)}
          nextFunction={{ label: "Function: 2", value: "function2" }}
          inputRef={(el) => {
            if (!functionRefs.current[0])
              functionRefs.current[0] = { input: null, output: null };
            functionRefs.current[0].input = el;
          }}
          outputRef={(el) => {
            if (!functionRefs.current[0])
              functionRefs.current[0] = { input: null, output: null };
            functionRefs.current[0].output = el;
          }}
        />
        <FunctionContainer
          index={2}
          equation={functions[1]}
          setEquation={(eq) => handleEquationChange(1, eq)}
          nextFunction={{ label: "Function: 4", value: "function4" }}
          inputRef={(el) => {
            if (!functionRefs.current[1])
              functionRefs.current[1] = { input: null, output: null };
            functionRefs.current[1].input = el;
          }}
          outputRef={(el) => {
            if (!functionRefs.current[1])
              functionRefs.current[1] = { input: null, output: null };
            functionRefs.current[1].output = el;
          }}
        />
        <FunctionContainer
          index={3}
          equation={functions[2]}
          setEquation={(eq) => handleEquationChange(2, eq)}
          nextFunction={{ label: "-", value: "-" }}
          inputRef={(el) => {
            if (!functionRefs.current[2])
              functionRefs.current[2] = { input: null, output: null };
            functionRefs.current[2].input = el;
          }}
          outputRef={(el) => {
            if (!functionRefs.current[2])
              functionRefs.current[2] = { input: null, output: null };
            functionRefs.current[2].output = el;
          }}
        />

        <InputWithRadio
          title={"Final Output (y)"}
          value={finalOutput}
          isOutput={true}
          outputRef={outputRadioRef}
        />
      </div>

      <div className={"bottom-section"}>
        <FunctionContainer
          index={4}
          equation={functions[3]}
          setEquation={(eq) => handleEquationChange(3, eq)}
          nextFunction={{ label: "Function: 5", value: "function5" }}
          inputRef={(el) => {
            if (!functionRefs.current[3])
              functionRefs.current[3] = { input: null, output: null };
            functionRefs.current[3].input = el;
          }}
          outputRef={(el) => {
            if (!functionRefs.current[3])
              functionRefs.current[3] = { input: null, output: null };
            functionRefs.current[3].output = el;
          }}
        />
        <FunctionContainer
          index={5}
          equation={functions[4]}
          setEquation={(eq) => handleEquationChange(4, eq)}
          nextFunction={{ label: "Function: 3", value: "function3" }}
          inputRef={(el) => {
            if (!functionRefs.current[4])
              functionRefs.current[4] = { input: null, output: null };
            functionRefs.current[4].input = el;
          }}
          outputRef={(el) => {
            if (!functionRefs.current[4])
              functionRefs.current[4] = { input: null, output: null };
            functionRefs.current[4].output = el;
          }}
        />
      </div>
    </AppContainerStyles>
  );
};

export default App;
