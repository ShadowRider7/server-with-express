import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config";
import { pool } from "./db";

const app: Application = express();
const port = config.port;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  //   res.send("Hello World!");
  res.status(200).json({
    message: "Espress Server Siktechi",
    author: "sadhin bro",
  });
});

app.post("/api/users", async (req: Request, res: Response) => {
  //   console.log(req.body);
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      `
INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)
RETURNING *
`,
      [name, email, password, age],
    );

    res.status(201).json({
      success: true,
      message: " user created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(202).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users
      `);
    return res.status(200).json({
      success: true,
      message: "users retried Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
});

app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
    SELECT * FROM users WHERE id=$1 
    `,
      [id],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found!",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "user retried Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
});

app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;

  try {
    const result = await pool.query(
      `
  UPDATE
  users
   SET 
   name=COALESCE($1,name),
   password=COALESCE($2,password),
   age=COALESCE($3,age),
   is_active=COALESCE($4,is_active)
  WHERE id =$5 RETURNING *
  `,
      [name, password, age, is_active, id],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found!",
        data: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "user updated Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
});

app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
  DELETE FROM users WHERE id=$1
  `,
      [id],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found!",
        data: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "user deleted Successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
});

export default app;
