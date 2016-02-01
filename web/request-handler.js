var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers.js')

// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.method === 'GET'){
    http.serveAssets(res, req.url, function(res){
    })
  }

  // archive.readListOfUrls();
  // res.end(archive.paths.list);
};
