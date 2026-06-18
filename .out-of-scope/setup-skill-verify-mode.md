# Verify/Check Mode for `setup-matt-pocock-skills`

This project will not add a dedicated verify/check mode (or a separate verify skill) for `setup-matt-pocock-skills`.

## Why this is out of scope

A second skill — or a `--verify` flag — for checking whether `docs/agents/*.md` artifacts still match the seed-template schema would duplicate work the existing setup skill already handles in conversation.

The intended workflow is: **run `/setup-matt-pocock-skills` and tell it to verify your current setup.** The skill is prompt-driven, so the maintainer can scope it to a verification pass ("don't rewrite anything, just check my existing files against the current seed templates and report drift") without needing a separate code path. Adding a flag or a sibling skill would split the surface area of a feature that's already expressible through the natural-language entry point.

Keeping configuration management to a single skill also avoids the maintenance cost of two skills drifting from each other when seed templates evolve.

## Prior requests

- #106 — Feature request: verify/check mode for setup-matt-pocock-skills
