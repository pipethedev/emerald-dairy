interface greetProps {
  name: string;
}

const Greeting = ({ name }: greetProps) => {
  const getGreeting = (): string => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      return "good morning";
    } else if (currentTime >= 12 && currentTime < 18) {
      return "good afternoon";
    } else {
      return "good evening";
    }
  };

  const greeting = getGreeting();

  return <div className="capitalize ">{`${greeting}, ${name}!`}</div>;
};

export default Greeting;
