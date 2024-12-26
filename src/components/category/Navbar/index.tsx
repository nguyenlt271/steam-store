'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import ListItem from './Item';
import React from 'react';
import Image from 'next/image';
import { useCategory } from '@/lib/context/CategoryContext';

function CategoryNavbar() {
  const { categories } = useCategory();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-2 md:w-[400px] lg:w-[480px] lg:grid-cols-[.75fr_1fr]">
              {categories.map((category) => (
                <ListItem
                  key={category?.category_id}
                  href="/docs"
                  className="w-full"
                >
                  <div className="flex-shrink-0 relative w-6 h-6">
                    <Image
                      alt="logo"
                      src={`${category?.category_name}.svg`}
                      fill
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  <div className="flex-shrink-0 text-sm font-medium leading-none text-white line-clamp-1 max-w-32">
                    {category?.category_title}
                  </div>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-2 md:w-[400px] lg:w-[480px] lg:grid-cols-[.75fr_1fr]">
              {categories.map((category) => (
                <ListItem
                  key={category?.category_id}
                  href="/docs"
                  className="w-full"
                >
                  <div className="flex-shrink-0 relative w-6 h-6">
                    <Image
                      alt="logo"
                      src={`${category?.category_name}.svg`}
                      fill
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  <div className="flex-shrink-0 text-sm font-medium leading-none text-white line-clamp-1 max-w-32">
                    {category?.category_title}
                  </div>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default CategoryNavbar;
