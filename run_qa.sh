#!/bin/bash
export PATH="$HOME/.bun/bin:$PATH"
B="/home/dwizzy/.claude/skills/gstack/browse/dist/browse"

$B goto https://sunday-vibes-jnsjjebmn-sundayvibes.vercel.app
echo "Waiting for page load..."
sleep 2

echo "Taking full snapshot..."
$B snapshot -i -a -o /tmp/homepage-annotated.png

echo "Mobile Responsive Snapshot..."
$B responsive /tmp/layout

echo "Checking Console Errors..."
$B console --errors

echo "Done"
