# Patch notes

## Changes

- Grouped task search conditions so archived tasks are excluded and the selected status applies to title and description matches.
- Removed the artificial request delay. Added clear 400 responses for unsupported statuses and invalid pagination, with page sizes capped at 100.
- Cancelled outdated frontend requests, cleared old errors, ensured failed requests end the loading state, and reset to page 1 when filters change.
- Replaced the raw fetch error with a plain-language message and Retry button that repeats the current request.
- Added inline task-title completion accepted with Tab or Right Arrow, plus a platform-appropriate Ctrl/⌘ K search shortcut.
- Applied the SQL correction to both SQL reference artifacts.

## Deferred work

The repository loads every matching task before slicing a page in memory. A database-level paged query with a matching count query would scale better, but would be a larger change than this focused patch.

## Biggest remaining risk

Search still loads all matching rows into application memory, so response time and memory use will grow with the task table.

## Verification

Started the backend and frontend locally. Checked filtering, pagination, invalid inputs, error recovery, inline completion, and keyboard shortcuts. Simulated a delayed `slow` request, then searched `mobile`; the slow request was aborted and mobile results remained after the delay window. Also stopped the backend, searched for `api`, restarted it, and retried unchanged; results loaded. No automated tests were run. I did not run the Oracle reference package because the local setup uses H2.

## Tools and AI

Used Codex to inspect the code and suggest focused fixes. Reviewed the changes against SQL operator precedence and the frontend request lifecycle. I documented each fix in my handwritten notes.
