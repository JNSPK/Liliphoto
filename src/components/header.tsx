import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { buttonVariants } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu';

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

function Header({ className: className }: HeaderProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`font-medium backdrop-blur-sm bg-violet-500 bg-opacity-30 w-full max-h-20 shadow-md sticky top-0 justify-between pl-4 md:px-8 min-h-12 z-[999] flex items-center ${className}`}>
      <p className='text-primary-foreground z-50'>Aly's Photography</p>
      <NavigationMenu className=''>
        <NavigationMenuList className='uppercase flex gap-0 md:gap-4 text-primary-foreground'>
          <NavigationMenuItem>
            <Link
              to='/'
              className={`${buttonVariants({
                variant: isActive('/') ? 'active' : 'link',
              })} h-[var(--header-height)]`}>
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to='/albums'
              className={`${buttonVariants({
                variant: isActive('/albums') ? 'active' : 'link',
              })} h-[var(--header-height)]`}>
              Albums
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to='/about'
              className={`${buttonVariants({
                variant: isActive('/about') ? 'active' : 'link',
              })} h-[var(--header-height)]`}>
              About
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className='backdrop-blur-sm fixed h-12 inset-0'></div>
    </header>
  );
}

export default Header;
