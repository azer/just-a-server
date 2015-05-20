var serve = require("./");

serve('./', 'localhost:8080', function (path, req, res) {
  if (path == 'yo') {
    res.end('yo');
    return true;
  }
});
