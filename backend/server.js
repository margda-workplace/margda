const express = require("express");
const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors")

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://margda.org", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// 🔹 Env variables
const PORT = process.env.PORT || 5000;
const SALT_ROUNDS = 12; // Higher number = more secure but slower

// 🔹 PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

// 🔹 Function to generate random password
// const generateRandomPassword = (length = 12) => {
//   const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
//   let password = "";
//   for (let i = 0; i < length; i++) {
//     password += charset.charAt(Math.floor(Math.random() * charset.length));
//   }
//   return password;
// };

// Test database connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
    console.error('Connection details:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER
    });
  } else {
    console.log('✅ Successfully connected to PostgreSQL');
    console.log(`Connected to: ${process.env.DB_NAME} on ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    release();
  }
});

app.get("/", (req, res) => {
  res.send("API Server Live!");
});

// 🔹 Insert user data from frontend
app.post("/api/users", async (req, res) => {
  try {
    const { name, whatsapp, password } = req.body;

    // Validate required fields
    if (!name || !whatsapp || !password) {
      return res.status(400).json({ 
        error: "Missing required fields", 
        required: ["name", "whatsapp", "password"] 
      });
    }

    // Validate password strength (optional but recommended)
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long"
      });
    }

    const client = await pool.connect();
    try {
      // Hash the password before storing
      console.log("🔐 Hashing password...");
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      console.log("✅ Password hashed successfully");

      // Insert user into database with hashed password
      const result = await client.query(
        'INSERT INTO "user" (name, whatsapp, pas) VALUES ($1, $2, $3) RETURNING "userID", name, whatsapp',
        [name, whatsapp, hashedPassword]
      );

      console.log("✅ User inserted:", result.rows[0]);

      // Return success response (never include password in response)
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          userID: result.rows[0].userID,
          name: result.rows[0].name,
          whatsapp: result.rows[0].whatsapp
          // Note: Never return password or hash in response
        }
      });

    } catch (dbError) {
      console.error("❌ Database error:", dbError);
      
      // Handle duplicate entry error
      if (dbError.code === '23505') {
        return res.status(409).json({
          error: "User with this WhatsApp number already exists"
        });
      }
      
      res.status(500).json({ 
        error: "Database error occurred" 
      });
    } finally {
      client.release();
    }

  } catch (error) {
    console.error("❌ API error:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
});

// 🔹 Login endpoint to verify passwords
app.post("/api/login", async (req, res) => {
  try {
    const { whatsapp, password } = req.body;

    // Validate required fields
    if (!whatsapp || !password) {
      return res.status(400).json({ 
        error: "Missing required fields", 
        required: ["whatsapp", "password"] 
      });
    }

    const client = await pool.connect();
    try {
      // Get user from database
      const result = await client.query(
        'SELECT "userID", name, whatsapp, pas FROM "user" WHERE whatsapp = $1',
        [whatsapp]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({
          error: "Invalid credentials"
        });
      }

      const user = result.rows[0];
      
      // Compare provided password with hashed password
      const passwordMatch = await bcrypt.compare(password, user.pas);
      
      if (!passwordMatch) {
        return res.status(401).json({
          error: "Invalid credentials"
        });
      }

      console.log("✅ User logged in:", user.userID);

      // Return success response (never include password hash)
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          userID: user.userID,
          name: user.name,
          whatsapp: user.whatsapp
        }
      });

    } catch (dbError) {
      console.error("❌ Database error:", dbError);
      res.status(500).json({ 
        error: "Database error occurred" 
      });
    } finally {
      client.release();
    }

  } catch (error) {
    console.error("❌ API error:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});