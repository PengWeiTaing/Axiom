# Current State

Snapshot basis:
pulled from VPS `/opt/axiom` on 2026-04-21.

## Stage Judgment

The project is beyond pure concept stage.

It is best described as:

`Axiom v0.1 alpha`

Reason:

- the minimum backend chain already exists
- the receiver can already accept, store, and query data
- but runtime stability and operational reliability are not finished

## Implemented So Far

### Implemented endpoints

- `/add`
- `/recent`
- `/search`

### Existing data snapshot at inspection time

- `items` rows in SQLite: `3`
- text files in `data/inbox`: `6`

### Existing supporting files

- `core/receiver.py`
- `core/init_db.py`
- legacy backup receiver variants in `core/`
- `backup/` directory exists but has no real backup files

## Main Risks

### Runtime

- port `5000` was not listening during inspection
- historical `gunicorn` timeout logs exist
- no confirmed dedicated `systemd` service was found

### Data consistency

- inbox file count does not match database row count
- `/add` currently writes file first, then writes database row
- there is no compensation logic if the second step fails

### Configuration

- secret key is hardcoded
- important paths are hardcoded

### Maintainability

- database init logic is duplicated
- backup flow is not formalized yet

## Recommended Next Step Order

1. make the receiver runtime stable
2. improve write reliability and consistency
3. add a real backup script or backup flow
4. normalize `/recent` and `/search` behavior
