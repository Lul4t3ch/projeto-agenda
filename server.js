require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect(process.env.CONNECTIONSTRING, 
    {useNewUrlParser: true,
     useUnifiedTopology: true})
    .then(() => {
        app.emit('pronto');
    }).catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrf, csrfMiddleware } = require('./src/middlewares/middleware');


app.use(helmet());
app.use(helmet.referrerPolicy({policy: ["origin", "unsafe-url"]}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'jfksajfksaiofujsfjdskjfkjsa',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, 
        httpOnly: true
    },
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING})
})

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
//meu middleware aqui..
app.use(middlewareGlobal);
app.use(checkCsrf);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Running on http://localhost:3000');
        console.log('Server executando na porta 3000');
    });
})
