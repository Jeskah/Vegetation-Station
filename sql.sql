CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);






-- Browser (5173)
--    |
--    | fetch POST /login
--    v
-- Server (3000)
--    |
--    | yes / no
--    v
-- Browser updates UI
