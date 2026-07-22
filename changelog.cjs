// Simple changelog generator that just outputs the changeset body
// No GitHub API lookups needed — avoids failures on mirrored repos

async function getReleaseLine(changeset) {
  const [firstLine, ...futureLines] = changeset.summary
    .split("\n")
    .map(l => l.trim());

  const body = futureLines.length > 0
    ? `\n${futureLines.join("\n")}`
    : "";

  return `\n- ${firstLine}${body}`;
}

async function getDependencyReleaseLine() {
  return "";
}

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
};
