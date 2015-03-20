var express = require('express');
var app = express();
var swig = require('swig');
var config = require('./config');

swig.setDefaults({varControls:['<%=', '%>']});

app.set('port', process.env.PORT || config.port);
app.engine('html', swig.renderFile);
// set .html as the default extension
app.set('view engine', 'html');

// Set views path, template engine and default layout
app.set('views', './app');
app.use('/public',      express.static('./app'));
app.use('/vendor',      express.static('./vendors'));

app.get('/',function (req, res){
    res.render('index', { 'config':config.app });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

