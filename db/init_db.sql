sqlite3 data.db

CREATE TABLE waterIntake (
    id TEXT NOT NULL PRIMARY KEY,
    amount REAL NOT NULL,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE urineOutput (
    id TEXT NOT NULL PRIMARY KEY,
    urineLossAmount REAL NOT NULL,
    catheterizedAmount REAL NOT NULL,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO waterIntake (id, amount, timestamp, createdAt, updatedAt) 
VALUES ('1', 500.0, '2023-10-01 10:00:00', '2023-10-01 10:00:00', '2023-10-01 10:00:00');

INSERT INTO urineOutput (id, urineLossAmount, catheterizedAmount, timestamp, createdAt, updatedAt) 
VALUES ('1', 300.0, 200.0, '2023-10-01 12:00:00', '2023-10-01 12:00:00', '2023-10-01 12:00:00');

-- Query to get all records from the waterIntake table
SELECT * FROM waterIntake;

-- Query to get all records from the urineOutput table
SELECT * FROM urineOutput;

SELECT name FROM sqlite_master WHERE type='table';