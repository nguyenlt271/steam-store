/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  Select as SelectProvider,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CONSTANT from '@/variables/constant';
import { IOption } from '@/variables/interface';
import { uniqueId } from 'lodash';
import Image from 'next/image';

interface IProps {
  label: string;
  value: string;
  placeholder: string;
  options: IOption[] | any[];
  onChange: (value: string) => void;
  className: string;
}
function Select({ label, options, ...props }: IProps) {
  const getLabel = (value: string) => {
    const item = CONSTANT.LABEL?.find((option) => option?.key === value);
    return item?.label || value;
  };

  return (
    <SelectProvider onValueChange={props.onChange} value={props.value}>
      <SelectTrigger className={`w-full ${props?.className}`}>
        <SelectValue placeholder={label || ''} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options?.map((option) => {
            return (
              <SelectItem
                key={option?.value || option || uniqueId()}
                value={option?.value || option || 'none'}
              >
                <div className='flex items-center gap-2'>
                  {option?.image && (
                    <div className='relative w-5 h-5'>
                      <Image
                        className='w-full h-full object-cover'
                        src={option.image}
                        fill
                        alt='image-select'
                      />
                    </div>
                  )}
                  {option?.title ||
                    getLabel(option?.label || option?.value || option)}
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </SelectProvider>
  );
}

export default Select;
