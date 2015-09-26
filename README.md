## just-a-server

A simple and small server with no configuration but still enough flexibility do stuff

## Install

```bash
$ npm install just-a-server
```

## Usage

Start serving the current working directory:

```js
var serve = require('just-a-server')
serve('./', 'localhost:8000')
```

Add a callback to do more:

```js
var serve = require('just-a-server')

serve('./static', 'localhost:8000', function (path, req, res) {
  if (path == 'yo') {
    res.end('yo')
    return true
  }
})
```
