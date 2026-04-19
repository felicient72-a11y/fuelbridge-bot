const { calculateCreditScore, determineLimit } = require("./creditEngine");

let users = {};

async function handleUserMessage(number, message) {
  if (!users[number]) {
    users[number] = { step: "start" };
  }

  const user = users[number];

  switch (user.step) {
    case "start":
      user.step = "ask_salary";
      return "Welcome to FuelBridge ⛽\nGet fuel now, pay on payday.\n\nWhat is your monthly income?";

    case "ask_salary":
      user.salary = parseInt(message);
      user.step = "check_credit";

      const score = calculateCreditScore(user);
      const limit = determineLimit(score);

      user.limit = limit;

      if (limit === 0) {
        user.step = "declined";
        return "Sorry, you don't qualify right now.";
      }

      user.step = "approved";
      return `You're approved 🎉\nFuel limit: R${limit}\n\nReply YES to continue`;

    case "approved":
      if (message.toLowerCase() === "yes") {
        user.step = "fuel_amount";
        return "How much fuel do you need?";
      }
      return "Reply YES to continue";

    case "fuel_amount":
      user.requested = parseInt(message);

      if (user.requested > user.limit) {
        return `Limit exceeded. Your max is R${user.limit}`;
      }

      user.step = "confirm";
      return `Confirm fuel request of R${user.requested}? (YES/NO)`;

    case "confirm":
      if (message.toLowerCase() === "yes") {
        user.step = "completed";
        return "Fuel request approved ⛽\nProceed to station. Repay on payday.";
      }
      return "Request cancelled.";

    default:
      return "Type START to begin.";
  }
}

module.exports = { handleUserMessage };