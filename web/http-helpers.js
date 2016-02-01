var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

//will be used for most http requests
exports.sendResponse = function(response, obj, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(obj);
}

exports.collectData = function(request, callback){
  var data = "";
  request.on("data", function(chunk){
    data += chunk;
  });
  request.on("end", function(){
    callback(data);
  })
}

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  
  //default
  if (asset === '/'){
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, html){
      if(err){ console.log (err);}
      res.writeHeader(200, {"Content-Type":"text/html"});
      res.write(html);
      res.end()
    })
  } else if (asset === '/styles.css'){
    fs.readFile(__dirname + '/public/styles.css', 'utf8', function(err, html){
      if(err){ console.log (err);}
      res.writeHeader(200, {"Content-Type":"text/css"});
      res.write(html);
      res.end()
    })
  } else if (asset === '/favicon.ico'){
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, html){
     if(err){ console.log (err);}
      res.write(html);
      res.end()
    })
  } else {
    //check if url is in the sites folder! 
    archive.isUrlArchived(asset, function(bool){
      if (bool){
        //serve the site
        asset = asset.substring(1);
        fs.readFile(archive.paths.archivedSites + '/www.' + asset, 'utf8', function(err, html){
          if(err){ console.log(err);}
          res.writeHeader(200, {"Content-Type":"text/html"});
          res.write(html);
          res.end();
        })
      } else {
        
        //add to the list of sites to download and show them loading...
        fs.readFile(__dirname + '/public/loading.html', 'utf8', function(err, html){
         if(err){ console.log (err);}
          res.write(html);
          res.end()
        })

        archive.isUrlInList(asset, function(bool){
          if(!bool){
            //add to the list
            archive.addUrlToList(asset, function(done){
              if (done) {
                console.log('added to list!')
              }             
            })
          }else{
            console.log('already in the list!')
          }
        })    
      }

      // res.end()
    })
  }

};



// As you progress, keep thinking about what helper functions you can put here!
