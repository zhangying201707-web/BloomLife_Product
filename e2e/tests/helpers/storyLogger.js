async function logUserStory(test, usId, description, action, options = {}) {
  const sprintLabel = options.sprintLabel || 'Sprint2';
  const label = `[${sprintLabel}] Validating ${usId}: ${description}`;
  console.log(label);
  await test.step(label, action);
}

module.exports = { logUserStory };
