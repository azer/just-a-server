var http = require("http");
var fs = require("fs");
var parseUrl = require("url").parse;
var style = require("style-format");
var setContentType = require("set-content-type");
var path = require("path");

module.exports = server;

function server (wd, hostname, callback) {
  hostname = hostname.split(':');

  var options = {
    wd: wd,
    host: hostname[0],
    port: hostname[1] ? parseInt(hostname[1]) : 8000
  };

  var server = http.createServer(function (req, res) {
    var pathname = parseUrl(req.url).pathname.slice(1) || 'index.html';
    var fullpath = path.join(wd, pathname);

    setContentType(req, res);

    if (callback && callback(pathname, req, res)) return;

    fs.exists(fullpath, function (exists) {
      if (!exists) {
        console.log(style('  {red}404 {grey}' + fullpath + '{reset}'));
        return res.end('404 - Not Found');
      }

      fs.createReadStream(fullpath).pipe(res);
    });
  });

  server.listen(options.port, options.host);
  console.log('\n' + style('  {bold}Serving at {yellow}' + options.host + ':' + options.port + '{reset}') + '\n');

  return server;
}
