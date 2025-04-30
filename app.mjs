import express from 'express'
import routes from "./src/interfaces/routes/index.mjs"
import cookieParser from "cookie-parser";
import { errorHandler } from './src/infrastructure/middlewares/errorHandler.mjs';
import rateLimit from 'express-rate-limit';


const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(routes)
app.use(errorHandler)
app.use(rateLimit)

app.get("/", (request, response)=>{
  response.send("API JWT funcionando!")
})



export default app