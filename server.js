var express = require('express'); //express

// импортируем маршрутизаторы
var router = require('./routes/router');


// для использования express в рамках всего приложения
var app = express();

//сообщаем узлу, что My application будет использовать движок ejs для визуализации, смотрим настройку движка
app.set('views', './views');
app.set('view engine', 'ejs');

// сообщаем узлу о тех каталогах, из которых приложение может брать ресурсы
app.use('/', router);
app.use(express.static('src'));


//запускаем сервер на узле
var server = app.listen(3000, '127.0.0.1', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

// экспортируем это приложение в виде модуля
module.exports = app;