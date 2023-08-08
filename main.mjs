import express from 'express';
import path from 'path';
const __dirname = path.resolve();

import authRouter from './routes/auth.mjs'
import postRouter from './routes/post.mjs'

const app = express();
app.use(express.json()); 

app.use("/api/v1", authRouter)

app.use((req, res, next) => { // JWT
    let token = "valid"
    if (token === "valid") {
        next();
    } else {
        res.status(401).send({ message: "invalid token" })
    }
})

app.use("/api/v1", postRouter) // Secure api

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
})