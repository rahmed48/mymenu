var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
//import mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://dbserver:Rgvbzywu123@cluster0.a4qb2.mongodb.net/db_mymenu?retryWrites=true&w=majority",
  // "mongodb+srv://dbserver:Rgvbzywu123@cluster0.a4qb2.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
//router admin
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views")); // View EJS
// app.set("views", path.join(__dirname, "views2")); // View JSX
app.set("view engine", "ejs"); // EJS
// app.set("view engine", "jsx");
// app.engine("jsx", require("express-react-views").createEngine()); //engine JSX

app.use(methodOverride("_method"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 200000 },
  })
);
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);

app.use("/", indexRouter);
app.use("/users", usersRouter);   //Routes Express
app.use("/admin", adminRouter);  //Routes Express
app.use("/api/v1/menu", apiRouter);  //Routes Express

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
