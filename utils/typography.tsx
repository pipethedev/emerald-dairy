export function H1({ children, className, ...props }: TypographyProps) {
  return (
    <h1 className={`sm:text-4xl text-3xl font-bold ${className}`} {...props}>
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
      className={`text-[20px] -tracking-[0.6px] font-bold leading-normal font-aeonikBold ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className, ...props }: TypographyProps) {
  return (
    <h4
      {...props}
      className={`font-medium text-[16px] leading-[19.2px] ${className}`}
    >
      {children}
    </h4>
  );
}

export function H5({ children, className, ...props }: TypographyProps) {
  return (
    <h5
      {...props}
      className={`${className} font-normal text-[10px] font-aeonik  -tracking-[0.1px]`}
    >
      {children}
    </h5>
  );
}

export function P({ children, className, ...props }: TypographyProps) {
  return (
    <p
      className={`font-aeonik text-[14px] leading-[29.4px] font-normal  ${className}`}
      {...props}
    >
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
