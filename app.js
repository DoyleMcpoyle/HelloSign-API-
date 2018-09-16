
var http = require('http');
var hellosign = require('hellosign-sdk')({key : 'xxxxxxxxxxxx'}); // your HelloSign API Key here
var port = (process.env.PORT || process.env.VCAP_APP_PORT || 3000);


// Following the Embedded Signing Walkthrough 
// Fixed the issue(s) with API call
// Got sign_url to print out 

http
.createServer(
		function(req, res) {
			res.writeHead(200, {
				'Content-Type' : 'text/html'
			});
			res.write('<body><h1>Isn\'t this cool??</h1></body></html>');
			var options = {
					test_mode : 1,
					clientId : 'xxxxxxxxxxxxxx', // HelloSign Client ID here 
					subject : 'My First embedded signature request' ,
					message : 'Awesome, right? I know.',
					signers : [{
						email_address : 'pdoyleson@gmail.com',
						name : 'Pat'
					}],
					file_url : ['http://www.pdf995.com/samples/pdf.pdf'],
			};
			hellosign.signatureRequest.createEmbedded(options)
            .then(function(response){
                var signatureId = response.signature_request.signatures[0].signature_id;
                return hellosign.embedded.getSignUrl(signatureId);
            });

            var signature_id = 'xxxxxxxxxxxxxxx';
            hellosign.embedded.getSignUrl(signature_id)
            .then()

                .then(function(response){
                console.log('URL = ' + response.embedded.sign_url);
            })
			.catch(function(err){
				if (err !== null) {
					console.log('Bummer - we got an error here');
					console.log(err);
				}
			});

			res.end('\n');
		}).listen(port);

console.log('Server running at http://127.0.0.1:' + port); 

