// EXPERIMENTAL
import { PageProps } from "@/.next/types/app/layout";

type Props = {
  params: {
    [key: string]: string;
  };
};

export default function NotePage({ params }: PageProps) {
  console.log({ params });
  return <div>{params.note}</div>;
}
