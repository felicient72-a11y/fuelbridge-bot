function calculateCreditScore(user) {
  let score = 0;

  if (user.salary >= 5000) score += 40;
  if (user.salary >= 10000) score += 30;

  if (user.previousRepayments === "good") score += 30;

  return score;
}

function determineLimit(score) {
  if (score >= 80) return 1500;
  if (score >= 60) return 800;
  if (score >= 40) return 300;
  return 0;
}

module.exports = { calculateCreditScore, determineLimit };