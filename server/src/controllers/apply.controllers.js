import bcrypt from "bcrypt";
import { sql } from "../db.js";
import jwt from "jsonwebtoken";
import { mailer } from "../mail.js";
import { v4 as uuidv4 } from "uuid";

function generatePaddedUUID() {
  const uuid = uuidv4().replace(/-/g, "");
  const bigInt = BigInt("0x" + uuid);
  const lUUID = bigInt.toString().padStart(40, "0");
  return lUUID;
}

//apply mayorista

export const pais = async (req, res) => {
  try {
    const pais = await sql("SELECT * FROM pais");
    res.json(pais);
  } catch (error) {
    res.status(500).json({ error: "Error fetching countries" });
  }
};

export const contactus = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.json({ error: "All fields are required" });
  }

  try {
    const info = await mailer.sendMail({
      from: '"Le Stage" <lestagewholesaler@gmail.com>',
      to: "lestagewholesaler@gmail.com",
      subject: "Contacto",
      html: `<!doctype html>
                <html ⚡4email>
                  <head>
                    <meta charset="utf-8">
                    <style amp4email-boilerplate>body{visibility:hidden}</style>
                    <script async src="https://cdn.ampproject.org/v0.js"></script>
                    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                  </head>
                  <body>
                    <p>Email: ${email}</p>
                    <p>Nombre: ${name}</p>
                    <p>Mensaje: ${message}</p>
                  </body>
                </html>`,
    });

    if (info.accepted.length > 0) {
      res.json({ ok: "Message sent successfully" });
    } else {
      res.json({ error: "Error sending message" });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending message" });
  }
};

export const apply = async (req, res) => {
  const { address, country, email, eori, name, password, message } = req.body;
  let pass = await bcrypt.hash(password, 10);
  const newid = generatePaddedUUID();
  // console.log(newid);
  try {
    const [existemail] = await sql(" SELECT * FROM cliente WHERE email= $1 ", [
      email,
    ]);
    if (existemail) {
      res.json({ error: "The email is registered" });
    } else {
      const result = await sql(
        "INSERT INTO cliente(id_cliente,nombre, email, password, eori, id_pais, address) VALUES ($1, $2, $3, $4, $5, $6,$7) returning * ",
        [newid, name, email, pass, eori, country, address]
      );

      const [pais] = await sql("select * from pais where id_pais = $1", [
        country,
      ]);
      // console.log(pais.pais);
      if (result) {
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
                    <p>From: ${pais.pais} - ${address}</p>
                    <p>EORI:  ${eori}  </p>
                    <p>Mensaje : ${message}</p> 
                    </body>
                  </html>`,
        });
        res.json({ ok: "ok" });
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
    { expiresIn: "1m" }
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

  try {
    const [user] = await sql("SELECT * FROM cliente WHERE email = $1", [email]);

    if (!user) {
      return res.json({ error: "Incorrect email or password" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ error: "Incorrect email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    refreshTokens.push(refreshToken);

    // Responde con los datos del usuario y los tokens
    res.json({
      ok: "ok",
      id: user.id_cliente,
      name: user.nombre,
      email: user.email,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
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

export const restablecerpass = async (req, res) => {
  const { email } = req.body;

  const [user] = await sql("select * from cliente where email= $1", [email]);
  if (!user) {
    return res.json({ error: "User not found" });
  } else {
    const token = jwt.sign(
      { id: user.id_cliente, email: user.email },
      process.env.KEY_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    const info = await mailer.sendMail({
      from: '"Le Stage" <lestagewholesaler@gmail.com>',
      to: email,
      subject: "Recover your password",
      html: `<!doctype html>
              <html ⚡4email>
                <head>
                  <meta charset="utf-8">
                  <style amp4email-boilerplate>body{visibility:hidden}</style>
                  <script async src="https://cdn.ampproject.org/v0.js"></script>
                  <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                </head>
                <body>
                <p>Recover your password</p>
                <p>Link http://localhost:5173/resetpass/${user.id_cliente}/${token}</p> 
                </body>
              </html>`,
    });
    res.json({ ok: "ok" });
  }
};

export const resetpass = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const [user] = await sql("SELECT * FROM cliente WHERE id_cliente = $1", [
      id,
    ]);

    if (!user) {
      return res.json({ error: "User not found" });
    }

    jwt.verify(token, process.env.KEY_TOKEN, async (err, decoded) => {
      if (err) {
        return res.json({ error: "Invalid or expired token" });
      }
      try {
        const newpass = await bcrypt.hash(password, 10);

        const { rowCount } = await sql(
          "UPDATE cliente SET password = $1 WHERE id_cliente = $2",
          [newpass, id]
        );

        if (rowCount === 0) {
          return res.json({ error: "Password update failed" });
        }
        res.json({ ok: "Password updated successfully" });
      } catch (updateError) {
        res.json({ error: "Internal Server Error" });
      }
    });
  } catch (error) {
    res.json({ error: "Internal Server Error" });
  }
};
