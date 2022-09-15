interface ExerciseParserResult {
  value1Target: number;
  value2ArrOfDailyExerciseHr: Array<number>;
}

interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number | string;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseExerciseArgs = (
  dailyExercise: string[],
  target: string
): ExerciseParserResult => {
  const dailyExerciseNumbered = dailyExercise.map((i) => Number(i));
  if (!dailyExerciseNumbered.some(isNaN)) {
    return {
      value1Target: Number(target),
      value2ArrOfDailyExerciseHr: dailyExerciseNumbered,
    };
  } else {
    throw new Error('Provided values must be a number');
  }
};

export const calculateExercises = (
  targetDailyHours: number,
  arrOfHours: number[]
): exerciseResult => {
  const periodLength = arrOfHours.length;
  const average = arrOfHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= targetDailyHours;

  const getRating = (average: number, target: number): number | string => {
    if (average < target * 0.9) {
      return 1;
    } else if (average < target) {
      return 2;
    } else if (average > target) {
      return 3;
    }

    return 'no rating available';
  };

  const getRatingDescription = (rating: number | string): string => {
    if (rating === 1) {
      return 'terrible work, you barely exercised';
    } else if (rating === 2) {
      return 'not too bad but you can still exercise abit more';
    } else if (rating === 3) {
      return 'noicee, good job exercising this week, you beat your target';
    }

    return 'No description available';
  };
  const rating = getRating(average, targetDailyHours);
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength,
    trainingDays: arrOfHours.filter((i) => i > 0).length,
    target: targetDailyHours,
    average,
    success,
    rating,
    ratingDescription,
  };
};

// try {
//   //destructures return object from function
//   const { value1Target, value2ArrOfDailyExerciseHr } = parseExerciseArgs(
//     process.argv
//   );
//   console.log(calculateExercises(value1Target, value2ArrOfDailyExerciseHr));

//   // console.log(calculateExercises(value1Target, value2ArrOfDailyExerciseHr))
// } catch (error: unknown) {
//   let errorMessage = 'something went wrong: ';
//   if (error instanceof Error) {
//     errorMessage += `Error: ${error.message}`;
//   }
//   console.log(errorMessage);
// }
