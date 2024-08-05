import { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

function Header({ children, className: className }: HeaderProps) {
  return (
    <header
      className={`backdrop-blur-sm w-full min-h-[5rem] max-h-20 shadow-lg sticky top-0 flex items-center z-50 ${className}`}>
      {children}
    </header>
  );
}

export default Header;
