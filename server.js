var express = require('express'); //express
var path = require('path'); // здесь будем ссылаться на физические файлы
var logger = require('morgan');
var cookieParser = require('cookie-parser'); //для поддержки сеансов
var bodyParser = require('body-parser'); //для синтаксического разбора json
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport'); //Используем passportjs для аутентификации
var LocalStrategy = require('passport-local').Strategy; //используем стратегию паспорта
var session = require('express-session'); // для поддержки сеансов
var mongoose = require('mongoose'); //для mongodb, базы данных



// импортируем маршрутизаторы
var router = require('./routes/router');


// для использования express в рамках всего приложения
var app = express();

//сообщаем узлу, что My application будет использовать движок ejs для визуализации, смотрим настройку движка
app.set('views', './views');
app.set('view engine', 'ejs');

//сообщаем узлу глобальную конфигурацию parser, logger и passport
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// сообщаем узлу о тех каталогах, из которых приложение может брать ресурсы
app.use('/', router);
app.use(express.static('src'));


//запускаем сервер на узле
var server = app.listen(3000,'127.0.0.1', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

// экспортируем это приложение в виде модуля
module.exports = app;