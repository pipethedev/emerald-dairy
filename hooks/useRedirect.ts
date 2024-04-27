import { useRouter } from "next/router";

const useRedirect = () => {
  const router = useRouter();

  const redirectTo = (path: string) => {
    console.log("REDIRECTING!");
    router.push(path);
  };

  return redirectTo;
};

export default useRedirect;
