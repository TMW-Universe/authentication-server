export const calculatePasswordScore = (password: string) => {
  let score = 0;

  // Length
  const lengthScore = Math.min(2, password.length / 8);
  score += lengthScore;

  // Uppercase letters
  const uppercaseScore = Math.min(2, (password.match(/[A-Z]/g) || []).length);
  score += uppercaseScore;

  // Lowercase letters
  const lowercaseScore = Math.min(2, (password.match(/[a-z]/g) || []).length);
  score += lowercaseScore;

  // Numbers
  const digitScore = Math.min(2, (password.match(/\d/g) || []).length);
  score += digitScore;

  // Special characters
  const specialCharScore = Math.min(
    2,
    (password.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g) || []).length,
  );
  score += specialCharScore;

  // Deduct points for repeated characters
  const repeatedChars = password
    .split('')
    .filter((char, index, arr) => arr.indexOf(char) !== index).length;
  const repeatedCharScore = Math.max(0, 2 - repeatedChars);
  score -= repeatedCharScore;

  return Math.max(0, Math.min(10, score)); // Clamp score between 0 and 10
};
