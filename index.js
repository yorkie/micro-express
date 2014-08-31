
var http = require('http');

function Micro() {
  this._server = null;
  this._middlewares = [];
}

Micro.prototype._onrequest = function(req, res) {
  var self = this;
  var handleIndex = 0;
  _next();
  function _next() {
    var middleware = self._middlewares[handleIndex++];
    if (!middleware || middleware._router && req.url !== middleware._router)
      _next();
    else
      middleware(req, res, _next);
  }
}

// Public API
Micro.prototype.use = function(router, middleware) {
  if (typeof router === 'function') {
    middleware = router;
    router = null;
  }
  middleware._router = router;
  this._middlewares.push(middleware);
};

Micro.prototype.listen = function(port, callback) {
  var self = this;
  this._server = http.createServer(function(req, res) {
    self._onrequest.call(self, req, res);
  });
  this._server.listen(port, callback);
};

exports.createServer = function() {
  return new Micro();
};

