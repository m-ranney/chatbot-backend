require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jwt-simple");
const bodyParser = require("body-parser");
const axios = require("axios");
const uuid = require("uuid");
const cors = require("cors");
const port = process.env.PORT || 5000;

// THIS BACKEND IS FOR SAMPLE EMBEDDING ONLY! THIS IS NOT PRODUCTION AUTHENTICATION, PLEASE DO NOT REPLICATE THIS FOR PRODUCTION EMBEDDING  

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

function buildJwt(email, firstName, lastName, sharedSecret) {
  const jti = uuid.v4();
  const payload = {
    iat: Math.floor(new Date().getTime() / 1000),
    email,
    firstName,
    lastName,
    jti,
    exp: Math.floor((new Date().getTime() + 1440 * 60000) / 1000),
  };

  return jwt.encode(payload, sharedSecret, "HS256");
}

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      console.log("Received login request:", { email, password });
  
      const sisenseUrl = process.env.SISENSE_URL;
      const sharedSecret = process.env.SHARED_SECRET;
  
      if (!sisenseUrl || !sharedSecret) {
        console.error("Invalid URL or shared secret. Please check your environment variables.");
        return res.status(500).json({ error: "Invalid URL or shared secret." });
      }
  
      console.log("Using Sisense URL:", sisenseUrl);
  
      const response = await axios.post(
        `${sisenseUrl}/api/v1/authentication/login`,
        {
          username: email,
          password,
          strategy: "local",
        },
        {
          httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
        }
      );
  
      console.log("Response from Sisense:", response.data);
  
      if (response.data && response.data.access_token) {
        const token = buildJwt(email, email.split("@")[0], "", sharedSecret);
        console.log({
          token,
          sisenseUrl,
          sisenseToken: response.data.access_token
        });
        
        res.status(200).json({
          token, 
          sisenseUrl, 
          sisenseToken: response.data.access_token,
        });
      } else {
        res.status(401).json({ error: "Authentication failed" });
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response from Sisense:", error.response.status, error.response.data);
        res.status(error.response.status).json({ error: error.response.data });
      } else {
        console.error("Error during authentication:", error.message);
        res.status(500).json({ error: "Internal server error", details: error.message });
      }
    }
  });
  

app.listen(port, () => {
  console.log(`JWT handler listening on port ${port}`);
});