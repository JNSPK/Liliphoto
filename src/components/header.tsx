import { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

function Header({ children, className: className }: HeaderProps) {
  return (
    <header
      className={`w-full h-[10%] max-h-20 border-b-2 border-primary fixed top-0 flex items-center ${className}`}>
      {children}
    </header>
  );
}

export default Header;
