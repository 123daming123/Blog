var express = require('express');//这个模块在node_modules文件夹中
var path = require('path');//nodejs自带的，路径相关
var favicon = require('serve-favicon');//node_modules文件夹中 
var logger = require('morgan');//日志相关，node_modules文件夹中，具体看第19行代码  
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');//用于解析请求体的（应该），被express所调用 

var routes = require('./routes/index');//这里是默认的路由，路径是routes/index.js  
var users = require('./routes/users');//这里是默认的路由，路径是routes/users.js  


var reg=require('./routes/reg');
var login =require('./routes/login');
var session = require('express-session');  

var app = express();//生成一个express的实例  

// view engine setup
//设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 //设置日志显示，如果不需要的话可以注释掉这行代码
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/reg',reg);
app.use('/login',login);
/*app.use(session({  
    secret: 'recommend 128 bytes random string',  
    cookie: {maxAge: 3600 * 1000}  
}));*/

//路由的处理 
app.use('/', routes); //假如访问的网址是根目录，例如http://127.0.1.1/，交给routes这个js文件来处理，具体请查看routes 
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
module.exports = app;
