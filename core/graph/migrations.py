"""SQLite tables for Atlas v1 graph snapshots."""
from __future__ import annotations

import sqlite3


def ensure_graph_tables(conn: sqlite3.Connection) -> None:
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS graph_nodes (
            id TEXT PRIMARY KEY,
            entity_type TEXT NOT NULL,
            entity_id TEXT NOT NULL,
            title TEXT,
            summary TEXT,
            layer INTEGER NOT NULL,
            semantic_level TEXT,
            lifeline_id TEXT,
            cluster_id TEXT,
            module_id TEXT,
            weight REAL DEFAULT 0,
            centrality REAL DEFAULT 0,
            status TEXT,
            created_at TEXT,
            updated_at TEXT
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_graph_nodes_type ON graph_nodes(entity_type)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_graph_nodes_lifeline ON graph_nodes(lifeline_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_graph_nodes_cluster ON graph_nodes(cluster_id)")

    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS graph_edges (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source_id TEXT NOT NULL,
            target_id TEXT NOT NULL,
            edge_class TEXT NOT NULL,
            relation_type TEXT NOT NULL,
            strength REAL NOT NULL,
            confidence REAL NOT NULL,
            layer_delta INTEGER DEFAULT 0,
            evidence TEXT,
            generated_by TEXT,
            visible_by_default INTEGER DEFAULT 0,
            last_seen_at TEXT,
            created_at TEXT,
            updated_at TEXT
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_graph_edges_source ON graph_edges(source_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_graph_edges_target ON graph_edges(target_id)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_graph_edges_class ON graph_edges(edge_class)")

    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS graph_clusters (
            id TEXT PRIMARY KEY,
            label TEXT NOT NULL,
            summary TEXT,
            lifeline_id TEXT,
            module_id TEXT,
            item_count INTEGER DEFAULT 0,
            entity_count INTEGER DEFAULT 0,
            weight REAL DEFAULT 0,
            generated_by TEXT,
            created_at TEXT,
            updated_at TEXT
        )
        """
    )
    conn.execute("CREATE INDEX IF NOT EXISTS idx_graph_clusters_lifeline ON graph_clusters(lifeline_id)")

    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS graph_layout_cache (
            view_id TEXT PRIMARY KEY,
            dimension TEXT NOT NULL,
            center_node_id TEXT,
            graph_hash TEXT NOT NULL,
            layout_json TEXT NOT NULL,
            generated_at TEXT NOT NULL
        )
        """
    )

    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS graph_views (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            mode TEXT NOT NULL,
            center_node_id TEXT,
            max_nodes INTEGER,
            same_layer_threshold REAL,
            cross_layer_threshold REAL,
            created_at TEXT,
            updated_at TEXT
        )
        """
    )

