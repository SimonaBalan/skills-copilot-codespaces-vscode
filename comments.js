// Create web server
var http = require('http');
var url = require('url');
var comments = [];
var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true);
    // console.log(parsedUrl);
    if (parsedUrl.pathname === '/api/comments' && request.method === 'POST') {
        var comment = '';
        request.on('data', function (chunk) {
            comment += chunk;
        });
        request.on('end', function () {
            comment = JSON.parse(comment);
            comment.id = comments.length;
            comments.push(comment);
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(comment));
        });
    } else if (parsedUrl.pathname === '/api/comments' && request.method === 'GET') {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(comments));
    } else {
        response.statusCode = 404;
        response.end();
    }
});
server.listen(3000, function () {
    console.log('Server is listening on port 3000');
});