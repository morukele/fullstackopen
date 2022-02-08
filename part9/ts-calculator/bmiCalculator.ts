const calculateBmi = (height: number, weight: number): string => {
  const meterHeight: number = height / 100;
  const bmi: number = weight / meterHeight ** 2;
  console.log("BMI value: ", bmi);

  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  }

  if (bmi >= 16.0 && bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  }

  if (bmi >= 17.0 && bmi <= 18.4) {
    return "Underweight (Mild thinness)";
  }

  if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (Healthy weight)";
  }

  if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  }

  if (bmi >= 30.0 && bmi <= 34.9) {
    return "Obese (Class I)";
  }
  if (bmi >= 35.0 && bmi <= 39.9) {
    return "Obese (Class II)";
  }
  if (bmi >= 40.0) {
    return "Obese (Class III)";
  }

  throw new Error("Something went wrong");
};

console.log(calculateBmi(180, 74));
