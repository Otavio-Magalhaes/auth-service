import express from 'express'
import routes from "./src/interfaces/routes/index.mjs"
import cookieParser from "cookie-parser";
import { errorHandler } from './src/infrastructure/middlewares/errorHandler.mjs';
import { globalLimiter } from './src/infrastructure/middlewares/rateLimiters/globalLimiter.mjs';
import { loginLimiter } from './src/infrastructure/middlewares/rateLimiters/loginLimiter.mjs';



const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(routes)
app.use(globalLimiter)
app.use(loginLimiter)

app.get("/", (request, response)=>{
  response.send("API JWT funcionando!")
})
app.use(errorHandler)



export default app