export type ButtonProps = {
  children: React.ReactNode | string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  full?: boolean;
  color?: "primary" | "accent" | "error" | "gray";
  text?: "xs" | "sm" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  test?: "modal" | "notification";
};
