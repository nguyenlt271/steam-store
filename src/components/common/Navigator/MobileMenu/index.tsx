'use client'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import {
  Activity,
  Book,
  CircleHelp,
  Code,
  DollarSign, Flag, Menu, Settings,
  ThumbsUp,
  TrendingUp
} from 'lucide-react';
import React, { useMemo } from 'react';
import Button from '../../Button';
import Input from '../../Input';

function MobileMenu() {
  const navs = useMemo(
    () => [
      {
        key: 'general',
        heading: 'General',
        items: [
          {
            icon: <Book />,
            title: ' Rules and guarantee'
          },
          {
            icon: <CircleHelp />,
            title: ' Advices & Guides'
          },
          {
            icon: <Settings />,
            title: ' Market settings'
          },
          {
            icon: <TrendingUp />,
            title: ' Account Upgrades'
          },
          {
            icon: <DollarSign />,
            title: ' Currency Exchange Rates',
            separator: true
          }
        ]
      },
      {
        key: 'features',
        heading: 'Features',
        items: [
          {
            icon: <Activity />,
            title: ' New features'
          },
          {
            icon: <Flag />,
            title: ' Report a bug'
          },
          {
            icon: <ThumbsUp />,
            title: ' Suggest an idea'
          },
          {
            icon: <Code />,
            title: ' API Access',
            separator: true
          }
        ]
      }
    ],
    []
  );

  const [active, setActive] = React.useState(false);

  const onToggle = () => {
    setActive(!active);
  }
  return (
    <div>
      <Button variant='secondary' onClick={onToggle}>
        <Menu />
      </Button>
      <div className={`fixed inset-0 h-full w-full z-50 flex  transition-transform duration-300 ease-in-out  ${!active ? '-translate-x-[100%]' : 'translate-x-0 '}`}>
        <div className='py-6 p-2 w-4/5 flex flex-col gap-4 bg-secondaryCustoms text-primaryCustoms'>
          <Input placeholder='Search...' onChange={() => null} />
          <Command className='rounded-lg bg-secondaryCustoms unset max-h-full'>
            <CommandList className='max-h-full'>
              {navs.map((item, idx) => (
                <CommandGroup key={item.key} heading={item?.heading} className='p-0'>
                  {item.items.map((navItem, index) => (
                    <React.Fragment key={index}>
                      <CommandItem >
                        {navItem.icon}
                        <span>{navItem.title}</span>
                      </CommandItem>
                      {index === item.items.length - 1 &&
                        idx !== navs.length - 1 && (
                          <CommandSeparator className='my-2' />
                        )}
                    </React.Fragment>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </div>
        <div className='flex-1 flex-shrink-0' onClick={onToggle} />
      </div>
    </div>
  )
}

export default MobileMenu