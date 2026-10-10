#!/usr/bin/env bash
# Demo case set: the fifty public cases plus the synthetic gas emergency (cases/demo/051), for the video only.
# Usage: scripts/demo-cases.sh [dest]   then   pnpm cases --cases out/demo-cases --out out/demo --cuts evals/cuts-auto.json --concurrency 10
set -euo pipefail
cd "$(dirname "$0")/.."
DEST="${1:-out/demo-cases}"
rm -rf "$DEST" && mkdir -p "$DEST"
cp -R "HackatonPublicCases/Property Management/." "$DEST/"
cp -R cases/demo/051 "$DEST/051"
echo "$(ls "$DEST" | wc -l | tr -d ' ') cases in $DEST (051 is the gas emergency)"
