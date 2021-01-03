
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession       = require('express-session');
const app = express();
const cookieParser = require('cookie-parser');
const config = require('./config/_config')

const redis             = require("redis");
const connectRedis      = require('connect-redis');

const RedisStore = connectRedis(expressSession);

const redisClient = redis.createClient({
    port: 6379,
    host: 'localhost'
});

//ROUTE
const USER_ROUTE = require('./routes/user');
const PUBLIC_ROUTE = require('./routes/public');
const CAR_ROUTE = require('./routes/car');
const CATEGORY_ROUTE = require('./routes/category');
const RENT_ROUTE = require('./routes/rent');

//MODEL

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views', './views/');
app.use(cookieParser());

// app.use(expressSession({
//     secret: 'webbanhang',
//     saveUninitialized: true,
//     resave: true,
//     cookie: {
//         maxAge: 10 * 60 * 1000
//     }
// }))

app.use(expressSession({
    store: new RedisStore({client: redisClient}),
    secret: 'web-dat-ve',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 10 * 60 * 1000 * 100
    }
}));

app.use('/users', USER_ROUTE);
app.use('/', PUBLIC_ROUTE);
app.use('/car', CAR_ROUTE);
app.use('/category', CATEGORY_ROUTE);
app.use('/rent', RENT_ROUTE);

// app.use('/',HOME_ROUTE);
app.get('/',(req, res) => {
    res.redirect('/home')
});

// mongoose.connect(uri);

mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
    if(err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
    }
});

mongoose.connection.once('open', () => {
    console.log(`mongodb connected`);
    app.listen(5000,() => 
        console.log(`sever connected at port 5000`)
    )
})
