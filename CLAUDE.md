# find-peace — Claude Instructions

## Before starting any task

Always run `git status` at the start of every session and before beginning any significant task.

- If there are **uncommitted changes**, tell the user and offer to commit them before proceeding. Suggest a short commit message based on what the changes appear to be.
- If the working tree is **clean**, proceed without comment.

This matters because Claude works in a git worktree (separate branch). Uncommitted changes on main won't be in the worktree, and merging back becomes messy if both have changed the same files.
