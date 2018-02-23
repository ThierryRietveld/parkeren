const express = require('express');
const app = express();
const http = require('http').Server(app);
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = 4201;
const sha1 = require('sha1');
const axios = require('axios');

http.listen(4201, function () {
  console.log("App on port " + port);
});

// Body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// MySql Connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "parkerenn"
});

con.connect(function (err) {
  if (err) throw err;
});


app.post('/login', function (req, res) {

  console.log("fffff");
  con.query("SELECT * FROM users WHERE email = '" + req.body.email + "' AND password = '" + sha1(req.body.password) + "'", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if (result[0] && result[0].activatie == "1") {
      res.send(result);
    }
  });
});

app.post('/register', function (req, res) {

  makeid(function (id) {
    makeToken(function (token) {
      activateToken(function (activeToken) {
        con.query("INSERT INTO users VALUES (" + id + ",'" + token + "', '" + req.body.email + "','" + req.body.achternaam + "', '', '" + req.body.rekening + "', '" + req.body.nummer + "', 1,'" + activeToken + "')", function (err, result, fields) {
          if (err) throw err;
          // sending email
          axios.get('http://localhost/meuk/mail/mail.php?to=' + req.body.email + '&token=' + activeToken + '&id=' + id)
            .then(response => {
              res.send({
                error: false,
                msg: 'ok'
              });
            })
            .catch(error => {
              res.send({
                error: true,
                msg: 'no'
              });
            });
        });
      });
    });
  });
});

app.post('/activate', function (req, res) {

  con.query("SELECT * FROM users WHERE id=" + req.body.id + "", function (err, result, fields) {
    if (err) throw err;
    if (result[0].activatie != "1") {
      con.query("UPDATE users SET activatie='1', password='" + sha1(req.body.password) + "' WHERE id=" + req.body.id + " AND activatie='" + req.body.token + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send([true]);
      });
    } else {
      res.send([false])
    }
  });

});

app.post('/getUser', function (req, res) {
  console.log(req.body);
  con.query("SELECT * FROM users WHERE id=" + req.body.id + " AND token='" + req.body.token + "'", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post('/isloggedin', function (req, res) {

  con.query("SELECT * FROM users WHERE id=" + req.body.id + " AND token='" + req.body.token + "'", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/getReserveringen', function (req, res) {

  con.query("SELECT * FROM bestellingen as b, typeparking as t WHERE b.userId=" + req.body.id + " AND b.type = t.id", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/bestelling', function (req, res) {

  if (dataIsCorrect(req.body)) {
    con.query("INSERT INTO bestellingen VALUES(null," + req.body.user[0].id + ", '" + req.body.form.date + ' ' + req.body.form.time + ':00' + "', null, null, null, null, (select id from typeparking where type='" + req.body.form.type + "'), '" + req.body.form.kenteken + "')", function (err, result, fields) {
      if (err) throw err;

      axios.get('http://localhost/meuk/mail/bestellingMail.php?to=' + req.body.email + '&userId=' + req.body.user[0].id + '&id=' + result.insertId)
        .then(response => {
          res.send([true]);
        })
        .catch(error => {
          res.send([false]);
        });
    });
  } else {
    res.send([false]);
  }

});

app.post("/binnenrijden", function (req, res) {
  let d = new Date();
  let dateNow = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

  con.query("UPDATE bestellingen SET binnenrijtijd='" + dateNow + "' WHERE binnenrijtijd IS NULL AND id=" + req.body.id + " AND userId='" + req.body.userId + "'", function (err, result, fields) {

    if (err) throw err;

    kenteken(function (kenteken) {

      con.query("UPDATE bestellingen SET kenteken='" + kenteken + "' WHERE kenteken='' AND id=" + req.body.id + " AND userId=" + req.body.userId + " ", function (err, result, fields) {

        if (err) throw err;

        axios.get('http://localhost/meuk/mail/betaal.php?to=' + req.body.email + '&userId=' + req.body.userId + '&bestellingId=' + req.body.id)
          .then(response => {
            res.send([true]);
          })
          .catch(error => {
            res.send([false]);
          });
      });
    });
  });
});

app.post("/getRoles", function (req, res) {

  con.query("SELECT roles.role FROM userroles as roles, users_userroles as tussen WHERE tussen.user = " + req.body.id + " AND roles.id = tussen.role;", function (err, result, fields) {
    if (err) throw err;
    if (result) {
      let roleArray = [];
      for (let roles of result) {
        roleArray.push(roles.role);
      }
      res.send(roleArray);
    } else {
      return false;
    }

  });
});

app.post("/searchReserveringen", function (req, res) {

  if (req.body.kenteken) {
    console.log(req.body.kenteken);
    con.query("SELECT * FROM bestellingen as b, typeparking as t WHERE b.kenteken='" + req.body.kenteken + "' AND (t.type='" + req.body.types[0] + "' OR t.type='" + req.body.types[1] + "' OR t.type='" + req.body.types[2] + "') AND b.type = t.id", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  } else {
    con.query("SELECT * FROM bestellingen as b, typeparking as t WHERE (t.type='" + req.body.types[0] + "' OR t.type='" + req.body.types[1] + "' OR t.type='" + req.body.types[2] + "') AND b.type = t.id", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  }

});

app.post("/betalen", function (req, res) {

  con.query("UPDATE bestellingen SET betaald=" + req.body.prijs + ", betalingsTijd=NOW() WHERE id=" + req.body.bestellingId + " AND userId=" + req.body.userId + " ", function (err, result, fields) {
    if (err) throw err;
    axios.get('http://localhost/meuk/mail/uitrijMail.php?userId=' + req.body.userId + '&id=' + req.body.id)
      .then(response => {
        res.send([true]);
      })
      .catch(error => {
        res.send([false]);
      });
  });
});

app.post("/uitrijden", function (req, res) {
  con.query("UPDATE bestellingen SET vertrektijd=NOW() WHERE userId=" + req.body.userId + " AND vertrektijd IS NULL ", function (err, result, fields) {
    if (err) throw err;
    res.send([true]);
  });
});

app.post("/getUsers", function (req, res) {
  con.query("SELECT id, email, achternaam FROM users", function (err, result1, fields) {
    if (err) throw err;
    con.query("SELECT uu.user, ur.role FROM users_userroles as uu, userroles as ur WHERE uu.role = ur.id", function (err, result2, fields) {
      if (err) throw err;
      for (let user of result1) {
        user.roles = [];
        for (let role of result2) {
          if (user.id == role.user) {
            user.roles.push(role.role);
          }
        }
      }
      res.send(result1);
    });
  });
});

app.post("/getAllRoles", function (req, res) {
  con.query("SELECT * FROM userroles", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/addUserRole", function (req, res) {
  con.query("INSERT INTO users_userroles VALUES(null, " + req.body.id + ", (select id from userroles where role='" + req.body.role + "'))", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/deleteUserRole", function (req, res) {
  con.query("DELETE FROM users_userroles WHERE user=" + req.body.id + " AND  role=(select id from userroles where role='" + req.body.role + "') ", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

function dataIsCorrect(data) {
  var datum = new Date(data.form.date)
  var ageDifMs = Date.now() - datum.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  if (-Math.abs(ageDate.getUTCFullYear() - 1970) > 1 && -Math.abs(ageDate.getUTCFullYear() - 1970) < 2) {
    return false;
  } else {
    return true;
  }
}

function makeid(callback) {

  var text = "";
  var possible = "0123456789";
  var duplicate = false;

  for (var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  con.query("SELECT id FROM users WHERE id = '" + text + "' ", function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    if (result[0]) {
      console.log(text);
      makeid();
      duplicate = true;
      return;
    }
    if (!duplicate) {
      callback(text);
    }
  });
}

function activateToken(callback) {
  var text = "";
  var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var duplicate = false;

  for (var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  callback(text);
}

function makeToken(callback) {
  var text = "";
  var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var duplicate = false;

  for (var i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  callback(text);
}

function kenteken(callback) {
  let text = "";
  let possibleInt = "0123456789";
  let possibleChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < 2; i++) {
    text += possibleChar.charAt(Math.floor(Math.random() * possibleChar.length));
  }
  text += "-";
  for (let i = 0; i < 2; i++) {
    text += possibleInt.charAt(Math.floor(Math.random() * possibleInt.length));
  }
  text += "-";
  for (let i = 0; i < 2; i++) {
    text += possibleChar.charAt(Math.floor(Math.random() * possibleChar.length));
  }

  callback(text);
}
