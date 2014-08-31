
var micro = require('./index');
var app = micro.createServer();

app.use(function(req, res, next) {
  res.write('a');
  next();
});

app.use('/hello', function(req, res, next) {
  res.write('b');
  next();
});

app.use(function(req, res, next) {
  res.write('c');
  next();
});

app.use('/hello', function(req, res) {
  res.end('hello');
});

app.use('/goodbye', function(req, res) {
  res.write('goodbye');
});

app.use(function(req, res) {
  res.end();
});

app.listen(3000, function() {
  console.log('listening on 3000');
});

