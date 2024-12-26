/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Item from "./Item";
import { IParams } from "@/variables/interface";

interface IProps {
  headItem?: {
    param: IParams;
    attribute: any;
  };
  subItem?: {
    param: IParams;
    attribute: any;
  };
  mainItem?: {
    param: IParams;
    attribute: any;
  };
  label?: string;
}
export const GroupInput = ({ headItem, subItem, mainItem, label }: IProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-primaryCustoms font-semibold">{label}</p>}
      {headItem && (
        <div className="flex items-center gap-2 w-full">
          <div className="w-full">
            <Item
              params={headItem?.param}
              {...headItem?.attribute}
              className="bg-secondaryCustoms"
            />
          </div>
        </div>
      )}

      {subItem && mainItem && (
        <div className="flex items-center gap-2 w-full">
          <div className="w-2/5">
            <Item
              params={subItem?.param}
              {...subItem?.attribute}
              className="bg-secondaryCustoms"
            />
          </div>
          <div className="w-3/5">
            <Item
              params={mainItem?.param}
              {...mainItem?.attribute}
              className="bg-secondaryCustoms"
            />
          </div>
        </div>
      )}
    </div>
  );
};
