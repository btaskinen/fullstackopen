interface ProcessedValues {
  value1: number;
  value2: number[];
}

export const parseArguments = (args: string[]): ProcessedValues => {
  if (args.length < 4) throw new Error('Not enough arguments!');

  const userInput = args.slice(2);

  if (userInput.every((element) => !isNaN(Number(element)))) {
    const value1 = Number(args[2]);
    const restArgumentsString = args.slice(3);
    const restArguments = restArgumentsString.map((arg) => Number(arg));
    console.log(restArguments);
    return {
      value1: value1,
      value2: restArguments,
    };
  } else {
    throw new Error('Provided values were notumbers!');
  }
};
