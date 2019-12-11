#!/bin/sh

yarn translations-scan
SRC_PATTERN="app/i18n/*"

if [[ `git status --porcelain $SRC_PATTERN` ]]; then
  git status --porcelain $SRC_PATTERN
  echo 'Translation file changes detected, please check your changes and try again'
  exit 1
else
  exit 0
fi
