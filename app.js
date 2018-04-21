const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const render = require("koa-swig");
const co = require("co");
const path = require("path");
const axios = require('axios');

const router = new Router();
const app = new Koa();
app.use(router.routes());

app.context.render = co.wrap(
  render({
    root: path.join(__dirname, "./views"),
    autoescape: true,
    ext: "html",
    writeBody: false
  })
);

router
  // 渲染页面
  .get("/", async (ctx, next) => {
    ctx.body = await axios
      .get("http://localhost/basic/web/index.php?r=country/data")
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  .get("/index", async (ctx, next) => {
    ctx.body = await ctx.render("index.html");
  })
  .get("/delete/:id", async (ctx, next) => {
    var id = ctx.params.id;
    ctx.body = await axios
      .get("http://localhost/basic/web/index.php?r=country/delete&id="+id)
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  
  // 修改页面
  // .get("/update/:id", async (ctx, next) => {
  //   var id = ctx.params.id;
  //   ctx.body = await axios
  //     .get("http://localhost/basic/web/index.php?r=country/update&id="+id)
  //     .then(function (res) {
  //       return res.data;
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // })
  // .get("/book", async (ctx, next) => {
  //   ctx.body = await ctx.render("book.html");
  // })

app.use(serve(__dirname + "/public"));

app.listen(3000, async ctx => {
  console.log("server is running");
});