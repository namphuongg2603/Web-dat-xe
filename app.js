
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession       = require('express-session');
const app = express();
const cookieParser = require('cookie-parser');
const config = require('./config/_config')

//ROUTE
const USER_ROUTE = require('./routes/user');

//MODEL

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views', './views/');
app.use(cookieParser());

app.use(expressSession({
    secret: 'webbanhang',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 10 * 60 * 1000
    }
}))

app.use('/users', USER_ROUTE);
// app.use('/',HOME_ROUTE);
app.get('/',(req, res) => {
    res.json({message: 'connected'});
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
