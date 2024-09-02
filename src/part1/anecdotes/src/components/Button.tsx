import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: string;
}

export default function Button({ onClick, children, ...props }: ButtonProps) {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
}
