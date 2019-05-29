var express = require('express');
var app = express();
app.get('/taroH5', function(request, response) {
    response.sendFile(__dirname + '/dist/index.html');
});
app.use(expres.static('dist'));
app.listen(80, function(){
    console.log('应用服务已经启动！');
})