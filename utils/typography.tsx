interface TypographyProps extends React.HTMLProps<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export function H1({ children, className, ...props }: TypographyProps) {
  return (
    <h1
      className={`sm:text-4xl text-3xl font-bold mb-4 ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, ...props }: TypographyProps) {
  return (
    <h2
      className={`font-matter text-black leading-normal font-semibold md:text-[48px] text-center md:-tracking-[0.96px] -tracking-[0.64px] text-[32px] ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className, ...props }: TypographyProps) {
  return (
    <h3
      className={`sm:text-2xl text-xl font-semibold mb-2 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function P({ children, className, ...props }: TypographyProps) {
  return (
    <p className={`sm:text-base text-sm mb-4 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function Text({ children, className, ...props }: TypographyProps) {
  return (
    <span className={`sm:text-base text-sm ${className}`} {...props}>
      {children}
    </span>
  );
}
