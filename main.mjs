import express from 'express';
import cors from 'cors';
import path from 'path';
import authRouter from './routes/auth.mjs'
import postRouter from './routes/post.mjs'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3080;

import { decode } from 'punycode';


app.use(express.json()); 
app.use(cookieParser()); // cookie parser
app.use("/api/v1", authRouter)
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => { // JWT
    console.log("cookies: ", req.cookies);

    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log("decoded: ", decoded);

        req.body.decoded = {
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
        };

        next();

    } catch (error) {
        console.log(error);
        res.status(401).send({ message: "invalid token" })
    }


})

app.use("/api/v1", postRouter) // Secure api

app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
})