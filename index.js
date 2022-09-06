const express = require("express");
const bodyParser = require("body-parser");
const expressSanitizer = require('express-sanitizer');
const app = express();
const mysql = require("mysql");
const port = 8089;

app.use(expressSanitizer());
app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mySmartHome"
});
// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to database");
});
global.db = db;

require("./routes/main")(app);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static('public'))
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));