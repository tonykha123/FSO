interface BmiValues {
  value1Weight: number
  value2Height: number
}

const parseBmiArgs = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1Weight: Number(args[2]),
      value2Height: Number(args[3]),
    }
  } else {
    throw new Error('Provided values must be a number')
  }
}

const bmiCalculator = (weightInKg: number, heightInCm: number): string => {
  const heightSquared = (heightInCm * heightInCm) / 10000
  const bmi = weightInKg / heightSquared

  if (bmi < 18.5) {
    return `Your Bmi is ${bmi}, you are in the underweight range`
  } else if (bmi < 25) {
    return `Your Bmi is ${bmi}, you are in the normal range`
  } else if (bmi < 30) {
    return `Your Bmi is ${bmi}, you are in the overweight range`
  } else return `Your Bmi is ${bmi}, you are in the obese range`
}

try {
  //destructures return object from function
  const { value1Weight, value2Height } = parseBmiArgs(process.argv)
  console.log(bmiCalculator(value1Weight, value2Height))
} catch (error: unknown) {
  let errorMessage = 'something went wrong: '
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`
  }
  console.log(errorMessage)
}
