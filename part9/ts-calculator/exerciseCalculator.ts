interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHour: Array<number>,
  target: number
): result => {
  const average = exerciseHour.reduce((a, b) => a + b) / exerciseHour.length;
  const success = target >= average ? false : true;
  const periodLength = exerciseHour.length;
  const trainingDays = exerciseHour.filter((n) => n !== 0).length;
  const rating = 0; //Implement a rating system
  const ratingDescription = "not too bad"; //Implement this with the rating system

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
