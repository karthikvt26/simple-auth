var express = require('express');

var app = express();

var jwt = require('jsonwebtoken');
var config = require('./config');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var cors = require('cors')

var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

var apiRoutes = express.Router(); 

apiRoutes.post('/generate_token', function(req, res) {
  var payload = {
    username: config.userInfo,
  }
  var token = jwt.sign(payload, app.get('superSecret'), {
    expiresIn: 86400 // expires in 24 hours
  });

  res.json({
    success: true,
    message: 'Enjoy your token!',
    token: token
  });
})

apiRoutes.use(function(req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {
		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
	}
});

apiRoutes.get('/check_token', function(req, res) {
	res.json(req.decoded);
});

app.use('/api', apiRoutes);

app.listen(port, function(req) {
  console.log('Listening on port' + port);
});
