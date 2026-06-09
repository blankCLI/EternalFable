# EternalFable

> A redacted command-line demo of a Fable-style narrative cognition loop.

EternalFable is a CLI-only showcase for the public-facing shape of an internal
dream-analysis system: ingest a strange transmission, extract symbolic residue,
score its world-building potential, and emit a compact "Fable" dossier that can
be shown in a terminal, exported as JSON, or wired into another pipeline.

No website. No dashboard. No database requirement. No private orchestration.

This repository is designed to look and feel like the real concept without
shipping the proprietary parts that make the production system work.

```txt
$ npm run demo

ETERNALFABLE // CLAUDE FABLE ADAPTER
model profile : claude-fable-preview
mode          : offline redacted simulator
source        : samples/transmission.txt

[01] INGEST
  title       : MIRROR-VENDING PROTOCOL
  fingerprint : dd63772f31b9
  tokens      : 171

[02] SYMBOL EXTRACTION
  locations   : service corridor, vending alcove, repeating stairwell, door
  entities    : mirror process, operator, child voice, clerk, machine, shadow
  motifs      : recursion, threshold, exchange ritual, static, memory

[03] FABLE VERDICT
  score       : 0.87
  selection   : render-candidate
  reason      : strong architecture, recurring entities, and ritual objects

[04] REDACTED WORLD SKETCH
  A navigable interior unfolds around service corridor, vending alcove...
```

## What This Is

EternalFable is an open demo of a closed idea:

- A CLI "model adapter" that presents the pipeline as if it is talking to a
  Claude Fable profile.
- A deterministic offline simulator for screenshots, demos, and GitHub review.
- An optional live Anthropic mode for local experiments when you provide your
  own key and real model name.
- A clean surface area that can be copied into agents, cron jobs, or private
  backends without dragging a frontend along.

## What This Is Not

- Not an official Anthropic model release.
- Not a leak of prompts, private data, production routing, or internal scoring.
- Not a website or a hosted app.
- Not an autonomous poster, scraper, database service, or social bot.

The phrase "Claude Fable adapter" is a product-style demo label. In live mode,
the actual Anthropic model is controlled by `ANTHROPIC_MODEL`.

## Install

```bash
npm install
cp .env.example .env
```

The offline demo does not require secrets.

## Run

```bash
npm run demo
```

Analyze a local file:

```bash
npm run fable -- analyze --input ./samples/transmission.txt
```

Export machine-readable output:

```bash
npm run fable -- analyze --input ./samples/transmission.txt --json
```

Use live Anthropic generation:

```bash
ANTHROPIC_API_KEY=sk-ant-... ANTHROPIC_MODEL=claude-sonnet-4-6 npm run fable -- analyze --live
```

## CLI

```txt
node scripts/fable.mjs <command> [options]

Commands:
  demo                 Run the bundled cinematic sample.
  analyze              Analyze a sample or a file.
  reveal               Print the public redaction boundary.

Options:
  --input <path>        Read a transmission from disk.
  --live                Call Anthropic instead of the offline simulator.
  --json                Print JSON instead of the terminal dossier.
  --model <label>       Override the displayed Fable model profile.
  --redaction <level>   low, medium, or high. Default: medium.
  --no-color            Disable ANSI styling.
```

## Redaction Boundary

The public demo intentionally includes only:

- Input normalization.
- Heuristic symbol extraction.
- Deterministic scoring.
- Public-safe Fable voice rendering.
- Optional live LLM adapter.
- JSON export.

The public demo intentionally excludes:

- Production prompts.
- Private corpora.
- Source-specific scraping rules.
- Ranking weights.
- Render orchestration.
- Social posting automation.
- Operational secrets.

## Project Layout

```txt
scripts/fable.mjs        CLI entrypoint
src/fable-demo.mjs       Redacted Fable engine and renderers
samples/transmission.txt Bundled demo transmission
.env.example             Optional live Anthropic configuration
```

## Environment

```bash
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-4-6
FABLE_MODEL_LABEL=claude-fable-preview
FABLE_REDACTION_LEVEL=medium
```

## Design Notes

EternalFable is built to make the terminal output feel like a premium research
artifact while keeping the implementation readable. The offline engine is not
pretending to be the production model; it is a public surrogate that preserves
the concept: transmission in, symbolic map out.

The live adapter is deliberately thin. It sends a public-safe prompt, asks for
strict JSON, and falls back to the simulator if the response cannot be parsed.

## License

Use this demo as a reference implementation for CLI presentation, redacted AI
product demos, and narrative-analysis tooling. Do not present the demo model
label as an official Anthropic release.
