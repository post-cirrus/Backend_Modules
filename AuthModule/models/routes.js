module.exports = function(app, log) {

  app.get('/auth', function(request, response) {
        response.json({message:'Loading API version 0.0.1'}); // load the index.ejs file
  });

  app.post('/auth/cirrus', function(request, response) {
        log.info('Request: '+ request.body);
        var username = request.body.name;
        var password = request.body.password;
        response.json({message : 'Your entered the name : '+ username +' Password: '+password});
        //response.json({message:'Loading API "/auth/local" will authenticate user on Cirrus OAUTH2 Server version 0.0.1'}); // load the index.ejs file
  });

  app.post('/auth/signup', function(request, response) {
        response.json({message:'Loading API "/auth/signup" version 0.0.1'}); // load the index.ejs file
  });

  app.get('/auth/user/:user_id/:uid', function(request, response) {
      var userId = request.params.user_id;
      var uid = request.params.uid;
      response.json({message : 'User ID: '+ userId +' UID: '+ uid});
  });

};
