/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { RadioGroup as RadioGroupProvider } from "@/components/ui/radio-group";
import CONSTANT from "@/variables/constant";
import * as _ from "lodash";
import { useEffect, useState } from "react";

interface IProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function RadioGroup({ value, options, onChange }: IProps) {
  const [valueRadio, setValueRadio] = useState(value);

  const onClickOptions = (value: string) => {
    console.log("e.target.value:", value);
    onChange(value);
  };

  useEffect(() => {
    setValueRadio(value);
  }, [value]);

  return (
    <RadioGroupProvider
      defaultValue="comfortable"
      className="flex h-9 gap-0 bg-secondaryCustoms rounded-md shadow-md overflow-hidden"
    >
      {options.map((op) => {
        const checked = valueRadio === op;
        const option: any = ["yes", "no"].includes(op)
          ? {
              label: op === "yes" ? "Yes" : "No",
              key: op,
            }
          : CONSTANT.LABEL.find((item) => item.key === op);

        return (
          <div
            key={_.uniqueId()}
            className={`flex items-center justify-center w-fit ${
              checked ? "bg-primaryCustoms" : ""
            } ${!["yes", "no"].includes(op) ? "flex-1 w-full" : "min-w-12"}`}
            onClick={() => onClickOptions(option?.key)}
          >
            <Label htmlFor={option?.value} className={`px-2 cursor-pointer`}>
              {option?.label}
            </Label>
          </div>
        );
      })}
    </RadioGroupProvider>
  );
}
