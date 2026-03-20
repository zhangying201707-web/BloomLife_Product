async function logUserStory(test, usId, description, action) {
  const label = `[Sprint2] Validating ${usId}: ${description}`;
  console.log(label);
  await test.step(label, action);
}

module.exports = { logUserStory };
