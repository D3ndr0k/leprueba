import bcrypt from "bcrypt";
import { sql } from "../db.js";
import jwt from "jsonwebtoken";
import { mailer } from "../mail.js";

//apply mayorista

export const apply = async (req, res) => {
  const { address, country, email, eori, name, password, message } = req.body;
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
        // JSON.stringify();
        const info = await mailer.sendMail({
          from: '"Le Stage" <lestagewholesaler@gmail.com>',
          to: "lestagewholesaler@gmail.com",
          subject: "Aplicar para mayorista",
          html: `<!doctype html>
                  <html ⚡4email>
                    <head>
                      <meta charset="utf-8">
                      <style amp4email-boilerplate>body{visibility:hidden}</style>
                      <script async src="https://cdn.ampproject.org/v0.js"></script>
                      <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                    </head>
                    <body>
                    <p>Aplica: ${name} - ${email}</p>
                    <p>From: ${country} - ${eori} - ${address}</p>
                    <p>Mensaje : ${message}</p> 
                    </body>
                  </html>`,
        });
      } else {
        res.json({ error: "Sorry :( error " });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//login

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [compare] = await sql("SELECT * FROM cliente WHERE email= $1", [
      email,
    ]);
    // console.log(compare);
    if (compare.length === 0) {
      res.json({ error: "Incorrect email or passwordd" });
    } else {
      const pass = await bcrypt.compare(password, compare.password);
      if (pass.length === 0) {
        res.json({ error: "Incorrect email or password" });
      } else {
        const token = jwt.sign(
          {
            id: compare.id_cliente,
            name: compare.nombre,
            email: compare.email,
          },
          process.env.KEY_TOKEN,
          {}
        );
        res.cookie("token", token);

        res.status(200).json({ token });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserToken = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const validar = jwt.verify(token, process.env.KEY_TOKEN);
    if (!validar) {
      res.status(401).send({ message: "Token inválido" });
    } else {
      const data = jwt.decode(token, process.env.KEY_TOKEN);
      res.send(data);
    }
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  res.json({ Status: "ok" });
};
