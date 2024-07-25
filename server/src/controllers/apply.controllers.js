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

let refreshTokens = [];

//  refresh  tokens
export const refresh = async (req, res) => {
  const refreshToken = req.cookies.token;

  if (!refreshToken) {
    return res.status(401).json({ error: "You are not authenticated" });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ error: "Refresh token is not valid" });
  }

  jwt.verify(refreshToken, process.env.KEY_RETOKEN, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ error: "Token verification failed" });
    }

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id_cliente,
      name: user.nombre,
      email: user.email,
    },
    process.env.KEY_TOKEN,
    { expiresIn: "1d" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id_cliente,
      name: user.nombre,
      email: user.email,
    },
    process.env.KEY_RETOKEN
  );
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const [user] = await sql("SELECT * FROM cliente WHERE email = $1", [email]);

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      res.status(200).json({
        id: user.id_cliente,
        name: user.nombre,
        email: user.email,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({ error: "Incorrect email or password" });
    }
  } else {
    res.status(401).json({ error: "Incorrect email or password" });
  }
};

export const logout = (req, res) => {
  const refreshToken = req.cookies.token;

  if (refreshToken) {
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    res.cookie("token", "", { expires: new Date(0) });

    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
};

// controllers/authController.js

export const getUserData = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.KEY_RETOKEN, (err, user) => {
    if (err) {
      return res.json({ error: "Token verification failed" });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  });
};
