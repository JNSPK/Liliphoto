import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <header
      className={`backdrop-blur-sm w-full max-h-20 shadow-lg top-0 justify-between sticky px-8 min-h-12 z-50 flex items-center ${className}`}>
      <p className='text-primary-foreground z-50'>Aly's Photography</p>
      <NavigationMenu>
        <NavigationMenuList className='uppercase flex gap-4 text-primary-foreground'>
          <NavigationMenuItem>
            <Link to='/'>Home</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to='/albums'>Albums</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to='/about'>About</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className='backdrop-blur-sm fixed h-12 inset-0 bg-header bg-cover opacity-70'></div>
    </header>
  );
}

export default Header;
