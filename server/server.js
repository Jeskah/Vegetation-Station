import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"
import bcrypt from "bcrypt"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const password = "PlantCrazy";
// const hash = await bcrypt.hash(password, 10);
// console.log(hash)


const db = new pg.Pool({
    connectionString: process.env.DB_CONN
});

db.connect()
.then(() => console.log("Database connected!"))
.catch(err => console.error("Database connection error:", err));

app.get('/', (req, res) => {
    res.send('Hello, I`m the root')
});

app.get('/login', async (req, res) => {
    const data = await db.query(`SELECT * FROM users`)
    const messages = data.rows
    res.status(200).json(messages)
});

app.post('/login', async (req, res) => {
try {
    const { username, password } = req.body;

    // Fetch user from your table
    const result = await db.query(
      "SELECT * FROM users WHERE username=$1",
[username]
    );

    if (result.rows.length === 0) {
return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];

    // Compare submitted password to stored hash
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
    return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Logged in successfully" });

} catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
}
});


app.listen(7777, () => {
  console.log("server started running on http://localhost:7777");
});



// testing git