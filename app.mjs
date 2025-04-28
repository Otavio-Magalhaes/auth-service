import express from 'express'
import routes from "./src/interfaces/routes/index.mjs"
import cookieParser from "cookie-parser";
import { errorHandler } from './src/interfaces/middlewares/errorHandler.mjs';


const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(routes)
app.use(errorHandler)

app.get("/", (request, response)=>{
  response.send("API JWT funcionando!")
})



export default app