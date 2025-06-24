#!/bin/sh

if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky:debug $*"
  }
  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."
  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi
  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi
  export readonly husky_skip_init=1
  sh -e "$(dirname "$0")/../$hook_name" "$@"
  exitCode="$?"
  debug "$hook_name hook exited with code $exitCode (dry-run: $HUSKY_DRY_RUN)"
  if [ "$HUSKY_DRY_RUN" = "1" ]; then
    exit 0
  else
    exit "$exitCode"
  fi
fi
