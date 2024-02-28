DROP TABLE IF EXISTS codes;
CREATE TABLE IF NOT EXISTS codes (
    id integer PRIMARY KEY AUTOINCREMENT,
    code text NOT NULL,
    created_at text NOT NULL,
    updated_at text NOT NULL
);