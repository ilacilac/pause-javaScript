require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });
// const api = require('./api');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use((ctx) => {
  console.log(ctx.url);
  ctx.body = 'hello';
});
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port ', port);
});
