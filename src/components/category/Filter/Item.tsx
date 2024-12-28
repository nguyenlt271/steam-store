/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Checkbox from '@/components/common/Checkbox';
import Input from '@/components/common/Input';
import { RadioGroup } from '@/components/common/Radio';
import Select from '@/components/common/Select';
import { IParams } from '@/variables/interface';
import React from 'react';

interface IProps {
  params: IParams;
  value: string;
  defaultValues?: any;
  icon?: React.ReactNode;
  onChange: (value: string) => void;
  className?: string;
}
function Item(props: IProps) {
  const { params } = props;
  const renderFn = React.useCallback((props: IProps) => {
    if ((params.values?.length ?? 0) > 0 && params.input === 'string')
      return (
        <Select
          label={params?.description || params?.name || 'none'}
          options={params?.values || []}
          {...(props as any)}
        />
      );
    switch (params?.input) {
      case 'boolean':
        return (
          <div className='flex items-center h-9 p-2 bg-primaryCustoms rounded-md'>
            <Checkbox
              label={params?.description || params?.name}
              checked={Boolean(props.value)}
              {...(props as any)}
            />
          </div>
        );
      case 'yesno':
        return (
          <RadioGroup options={params?.values || []} {...(props as any)} />
        );
      case 'array':
        return (
          <Select
            label={params?.description || params?.name}
            options={params?.values || []}
            {...(props as any)}
          />
        );
      default:
        return (
          <Input
            placeholder={params?.description || params?.name}
            type={params?.input === 'number' ? 'number' : 'text'}
            icon={props?.icon}
            {...(props as any)}
          />
        );
    }
  }, []);

  return renderFn(props);
}

export default Item;
