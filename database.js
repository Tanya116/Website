const express = require ('express');
const mysql = require('mysql');
const sessions = require('express-session');
const bodyParser = require ('body-parser');
const http = require ('http');
const cookieParser = require('cookie-parser');


const app = express();
const port = 3000;

app.use(sessions ({
    secret: "secretkey",
    saveUninitialized: true,
    cookie: {maxAge: 100 * 60 * 60 * 24}, //(24 hrs session)
    resave: false
}));

app.use(cookieParser());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"kirisakiakame",
    database: "signup form"
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting:', err);
    } else{
        console.log ('Connected!');
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const {userName, password, Email, firstName, lastName} = req.body;

        connection.query(`SELECT * FROM users WHERE username_id = ? AND password = ?`, [userName, password], function(err, result){
            if (err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            };
            if(Object.keys(result).length > 0){
                res.sendFile(__dirname + '/failReg.html');
            }else{
                function userPage(){
                    req.session.user = {
                        firstname: firstName,
                        lastname: lastName,
                        username: userName, 
                        password: password 
                    };
                    res.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width,initial-scale=1.0">
                        <title>Home</title>
                        <script src="https://kit.fontawesome.com/a3b985f12f.js" crossorigin="anonymous"></script>
                        <link rel="stylesheet" href="style.css">
                        <link rel="icon" href="media/icon.ico">
                    </head>
                    <body>
                        <section class="header">
                            <a href="Home.html"><img src="media/FUrina image.png" class="logo" alt="logo"></a>
                        <div>
                            <ul id="navbar">
                                <li><a href="Home.html"><i class="fa-solid fa-house"></i></a></li>
                                <li><i class="fa-solid fa-magnifying-glass"></i><input type="text" class="search"></a></li>
                                <li><a href="Cart.html"><i class="fa-solid fa-cart-shopping"></i></a></li>
                                    <div class="cart-info">
                                        <span id="cartCounter" class="cartcount"> 0 </span>
                                    </div>
                                <li><a href="Home.hmtml"><i class="fa-solid fa-user"></i></a></li>
                                <li>${req.session.user.username} </li>
                            </ul>
                        </div>
                        </section>
                        <section class="_products">
                            <h1>Products</h1>
                              <div id="products" class="product"></div>
                            </div>
                        </section>  
                    </body>
                    <script src="products.js"></script> 
                    </html>
                    `);
                }
                const sql = 'INSERT INTO users (username_id, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)';
                connection.query ( sql, [userName, password, Email, firstName, lastName], (err, result) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        res.status(500).send('Internal Server Error')
                    } else{
                        userPage();
                        console.log('User Registered Successfully!');
            };
        });
    }

        });
    });
  


 //login 
 app.get("/signup", (req, res)=>{
    res.sendFile(__dirname + "/login.html");
});

// get user data to /dashboard page
app.post("/login", encodeUrl, (req, res)=>{
    var userName =  req.body.username;
    var password = req.body.password;

    connection.connect(function(err) {
        if(err){
            console.log(err);
        };
//get user data from MySQL database
        connection.query(`SELECT * FROM users WHERE username_id = ? AND password = ?`, [userName, password], function (err, result) {
          if(err){
            console.log(err);
          };

          function userPage(){
            // Create a session for the dashboard (user page)
            req.session.user = {
                firstname: result[0].firstname, // get MySQL row data
                lastname: result[0].lastname, 
                username: userName,
                password: password 
            };

            res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
                <title>Home</title>
                <script src="https://kit.fontawesome.com/a3b985f12f.js" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="style.css">
                <link rel="icon" href="media/icon.ico">
            </head>
            <body>
                <section class="header">
                    <a href="Home.html"><img src="media/FUrina image.png" class="logo" alt="logo"></a>
                <div>
                    <ul id="navbar">
                        <li><a href="Home.html"><i class="fa-solid fa-house"></i></a></li>
                        <li><i class="fa-solid fa-magnifying-glass"></i><input type="text" class="search"></a></li>
                        <li><a href="Cart.html"><i class="fa-solid fa-cart-shopping"></i></a></li>
                            <div class="cart-info">
                                <span id="cartCounter" class="cartcount"> 0 </span>
                            </div>
                        <li><a href="Home.hmtml"><i class="fa-solid fa-user"></i></a></li>
                        <li>${req.session.user.username} </li>
                    </ul>
                </div>
                </section>
                <section class="_products">
                    <h1>Products</h1>
                      <div id="products" class="product"></div>
                    </div>
                </section>  
            </body>
            <script src="products.js"></script> 
            </html>`);
        }

        if(Object.keys(result).length > 0){
            userPage();
        }else{
            res.sendFile(__dirname + '/failReg.html');
        }

        });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
