import sqlite3
import os

DB_PATH = "/opt/axiom/db/axiom.db"

os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

conn = sqlite3.connect(DB_PATH)
c = conn.cursor()

c.execute("""
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    content TEXT,
    file_path TEXT,
    source TEXT,
    created_at TEXT NOT NULL
)
""")

conn.commit()
conn.close()

print("database initialized:", DB_PATH)
