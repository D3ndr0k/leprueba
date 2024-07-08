import bcrypt from "bcrypt";
import { sql } from "../db.js";

//apply mayorista

export const apply = async (req, res) => {
  const { address, country, email, eori, name, password } = req.body;
  let pass = await bcrypt.hash(password, 10);

  try {
    const [existemail] = await sql(" SELECT * FROM cliente WHERE email= $1 ", [
      email,
    ]);
    if (existemail) {
      res.json({ error: "The email is registered" });
    } else {
      const result = await sql(
        "INSERT INTO cliente(nombre, email, password, eori, id_pais, address) VALUES ($1, $2, $3, $4, $5, $6) returning * ",
        [name, email, pass, eori, country, address]
      );
      if (result) {
        res.json({ ok: "ok" });
      } else {
        res.status(500);
        res.json({ error: "Sorry :( error " });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//login

export const login = async (req, res) => {};
