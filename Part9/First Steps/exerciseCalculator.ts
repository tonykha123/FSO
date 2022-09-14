interface exerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const weeklyExerciseHours = [3, 0, 2, 4.5, 0, 3, 1]

const calculateExercises = (
  arrOfHours: number[],
  targetDailyHours: number
): exerciseResult => {
  const periodLength = arrOfHours.length
  const average = arrOfHours.reduce((a, b) => a + b, 0) / periodLength
  const success = average >= targetDailyHours

  const getRating = (average: number, target: number): number => {
    if (average < target * 0.9) {
      return 1
    } else if (average < target) {
      return 2
    } else if (average > target) {
      return 3
    }
  }

  const getRatingDescription = (rating: number): string => {
    if (rating === 1) {
      return 'terrible work, you barely exercised'
    } else if (rating === 2) {
      return 'not too bad but you can still exercise abit more'
    } else if (rating === 3) {
      return 'noicee, good job exercising this week, you beat your target'
    }
  }
  const rating = getRating(average, targetDailyHours)
  const ratingDescription = getRatingDescription(rating)

  return {
    periodLength,
    trainingDays: arrOfHours.filter((i) => i > 0).length,
    target: targetDailyHours,
    average,
    success,
    rating,
    ratingDescription,
  }
}

console.log(calculateExercises(weeklyExerciseHours, 2))
