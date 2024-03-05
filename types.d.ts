declare module "*.json";

interface svgProps {
  className?: string;
}

interface formData {
  email: string;
  password: string | number;
  firstName: string;
  lastName: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  disabled?: boolean;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
}

interface SideNavigationLink {
  href: string;
  linkText: string;
  leading: React.FC<SVGProps<SVGElement>>;
}

interface Content {
  type: "heading" | "image" | "paragraph" | "video" | "file" | "check" | "link";
  value: string | { checked: boolean; label: string }; //other image types
}

interface Note {
  id?: string;
  title: string;
  subtitle: string;
  date: number | string;
  label?: any;
  favourite?: boolean;
  tag?: string;
  type?: "favourite" | "archived" | "deleted";
  folder?: string;
  content?: Content[];
}

interface TypographyProps extends React.HTMLProps<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

interface notesPreviewData {
  title: string;
  subtitle: string;
  date: string;
  tag: string;
  favourite: boolean;
}
