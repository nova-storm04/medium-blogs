import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user'
import {blogRouter} from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()
// testing pr
//hey im checking pr
app.use('/*', cors())
app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)


export default app
