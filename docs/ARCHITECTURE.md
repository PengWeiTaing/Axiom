# Axiom Architecture

## System Goal

Axiom is not a general note-taking app and not an agent demo project.
It is a long-term personal knowledge backend.

The intended long-running chain is:

`Input -> Storage -> Retrieval -> AI -> Decision`

## v0.1 Scope

The current phase only targets:

1. input reception
2. persistent storage
3. basic retrieval

Later phases may add:

- AI summary
- classification suggestion
- inbox processing scripts
- weekly review scripts

## Current Deployment Architecture

At the current stage, the VPS is the main node.

```text
iPhone
  -> iOS Shortcuts
  -> VPS
  -> Flask receiver
  -> file system storage
  -> SQLite index
```

This is a stage-appropriate architecture because there is no always-on local machine.

## Storage Model

### File System

- `data/inbox/` stores raw captured content files
- `data/archive/` is reserved for later organization
- files are the primary content body

### SQLite

- `db/axiom.db` stores searchable metadata
- database records point to file paths
- database acts as index, not the final content authority

## Main Runtime Components

### Receiver

`core/receiver.py` is the current main application entry.

It currently contains:

- request handling
- key validation
- file write logic
- SQLite write logic
- recent query logic
- search logic

### Database Initialization

`core/init_db.py` creates the `items` table if needed.

## Current API Surface

### `/add`

Purpose:
receive text from shortcut input and persist it.

Current behavior:

- validate `key`
- validate `text`
- write text into inbox file
- insert metadata into SQLite

### `/recent`

Purpose:
read recent records from SQLite.

Current behavior:

- validate `key`
- read latest rows
- return JSON

### `/search`

Purpose:
perform basic keyword retrieval.

Current behavior:

- validate `key`
- match content with `LIKE`
- support `page`, `page_size`, `sort`

## Design Constraints

- do not switch away from Flask + SQLite in this phase
- do not replace file-plus-index storage design
- do not over-split into services
- do not optimize for long-term elegance at the cost of current reliability

## Engineering Priority Order

### Priority 1

- receiver stability
- reliable persistence
- safe file writes
- backup flow

### Priority 2

- better `/search`
- clearer `/recent`
- pagination
- error handling

### Priority 3

- image upload support
- multi-type item handling

### Priority 4

- AI summary
- classification
- automation scripts
