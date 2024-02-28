import { Hono } from "hono";
import { cors } from "hono/cors";
import { nanoid } from "nanoid";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(cors());

app.get("/api/codes", async (c) => {
  const { results } = await c.env.DB.prepare(`SELECT * FROM codes`).all();

  return c.json({ ok: true, results });
});

app.post("/api/codes", async (c) => {
  const body = await c.req.json<{ phoneNumber: string }>();

  const { success } = await c.env.DB.prepare(
    "INSERT INTO codes (code, created_at, updated_at) values (?, ?, ?)"
  )
    .bind(nanoid(), Date.now().toString(), Date.now().toString())
    .run();

  if (success) {
    c.status(201);
    return c.json({ ok: true });
  } else {
    c.status(500);
    return c.json({ ok: false });
  }
});

export default app;
