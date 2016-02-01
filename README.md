This is an exercise in trying to create a web archiver using node's 'fs' module. I also used node's 'http' module to create a server that will handle my incoming http requests. It also uses cron worker to automatically download websites that I have listed. 

The fs module has a lot of nifty methods that allows you to alter and read files on your computer. 

Some of the methods I used were:
* fs.readFile(path, encoding, function(err, fileContents){})
* fs.appendFile(path, textToAdd, function(err){})
* fs.exists(path, function(boolean){})

