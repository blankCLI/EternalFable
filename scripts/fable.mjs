#!/usr/bin/env node

import "dotenv/config";
import { analyzeTransmission, DEFAULT_SAMPLE_PATH, redactionBoundary, renderTerminalDossier } from "../src/fable-demo.mjs";

const args = process.argv.slice(2);
const command = args[0] && !args[0].startsWith("--") ? args.shift() : "demo";
const options = parseOptions(args);

try {
  if (command === "demo") {
    await runAnalyze({ ...options, inputPath: options.inputPath || DEFAULT_SAMPLE_PATH });
  } else if (command === "analyze") {
    await runAnalyze({ ...options, inputPath: options.inputPath || DEFAULT_SAMPLE_PATH });
  } else if (command === "reveal") {
    printReveal(options);
  } else if (command === "help" || command === "--help" || command === "-h") {
    printHelp();
  } else {
    throw new Error(`Unknown command: ${command}`);
  }
} catch (error) {
  console.error(`fable: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}

async function runAnalyze(options) {
  const result = await analyzeTransmission({
    inputPath: options.inputPath,
    live: options.live,
    modelLabel: options.modelLabel,
    redaction: options.redaction,
  });

  if (options.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log(renderTerminalDossier(result, { color: options.color }));
}

function printReveal(options) {
  const boundary = redactionBoundary();
  if (options.json) {
    console.log(JSON.stringify(boundary, null, 2));
    return;
  }

  console.log("ETERNALFABLE // PUBLIC REDACTION BOUNDARY\n");
  console.log("Included:");
  for (const item of boundary.includes) console.log(`  - ${item}`);
  console.log("\nExcluded:");
  for (const item of boundary.excludes) console.log(`  - ${item}`);
}

function printHelp() {
  console.log(`EternalFable CLI

Usage:
  node scripts/fable.mjs <command> [options]

Commands:
  demo                 Run the bundled cinematic sample.
  analyze              Analyze a sample or a file.
  reveal               Print the public redaction boundary.
  help                 Show this message.

Options:
  --input <path>        Read a transmission from disk.
  --live                Call Anthropic instead of the offline simulator.
  --json                Print JSON instead of the terminal dossier.
  --model <label>       Override the displayed Fable model profile.
  --redaction <level>   low, medium, or high. Default: medium.
  --no-color            Disable ANSI styling.
`);
}

function parseOptions(args) {
  const options = {
    color: process.env.NO_COLOR ? false : process.stdout.isTTY,
    inputPath: undefined,
    json: false,
    live: false,
    modelLabel: process.env.FABLE_MODEL_LABEL || "claude-fable-preview",
    redaction: process.env.FABLE_REDACTION_LEVEL || "medium",
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--input") {
      options.inputPath = requireValue(args, ++i, "--input");
    } else if (arg === "--json") {
      options.json = true;
    } else if (arg === "--live") {
      options.live = true;
    } else if (arg === "--model") {
      options.modelLabel = requireValue(args, ++i, "--model");
    } else if (arg === "--redaction") {
      options.redaction = requireValue(args, ++i, "--redaction");
    } else if (arg === "--no-color") {
      options.color = false;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function requireValue(args, index, flag) {
  const value = args[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value`);
  }
  return value;
}
