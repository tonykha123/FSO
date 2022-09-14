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

console.log(bmiCalculator(700, 170))
