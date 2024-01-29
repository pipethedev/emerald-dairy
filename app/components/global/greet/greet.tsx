interface greetProps {
  name: string;
}

const Greeting = ({ name }: greetProps) => {
  const getGreeting = (): string => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      return "Good morning";
    } else if (currentTime >= 12 && currentTime < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const greeting = getGreeting();

  return <div>{`${greeting}, ${name}!`}</div>;
};

export default Greeting;
