import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { buttonVariants } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu';
import logo from '/src/assets/img/logo.png';

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
      <img src={logo} className='max-h-[3rem] z-50 py-1'></img>
      <NavigationMenu className='flex justify-between'>
        <NavigationMenuList className='uppercase flex gap-0'>
          <NavigationMenuItem>
            <Link
              to='/'
              className={`${buttonVariants({
                variant: isActive('/') ? 'active' : 'link',
              })} h-[var(--header-height)] rounded-none`}>
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to='/albums'
              className={`${buttonVariants({
                variant: isActive('/albums') ? 'active' : 'link',
              })} h-[var(--header-height)] rounded-none`}>
              Albums
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to='/about'
              className={`${buttonVariants({
                variant: isActive('/about') ? 'active' : 'link',
              })} h-[var(--header-height)] rounded-none`}>
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
