// main.ts — entry program for the make.fun gta6-meme-x-01 bounty.
// The meme itself lives on X; this repo carries its URL in POST.json.
// This program does one thing: copy POST.json into the output directory.
// No network, no wall clock, deterministic.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const postPath = join(botDir, "POST.json");

// Validate that POST.json is well-formed JSON with a url field before copying.
const post = JSON.parse(readFileSync(postPath, "utf8")) as { url?: unknown };
if (typeof post.url !== "string" || post.url.length === 0) {
  throw new Error("POST.json must contain a non-empty url string");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(postPath, join(outDir, "POST.json"));
