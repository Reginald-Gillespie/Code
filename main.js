//Send webhook
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/1006720252861759639/9-lpfflbhXJWgkpdGmDiHr5d-GwyZLEm6zR_YgQID9FpDmEGgXtIhY9DMoVpDb8WkR95");
hook.setUsername("Heroku Webhook Test");
hook.send("Heroku Started");

// Note: heroku does not allow using more than 1 port, which is defined in process.env.PORT
// Meaning I can't run both the http and turn server at the same time.
 const port = process.env.PORT || 3000;

//Start http server
function startHttpServer() {
  const http = require('http');
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
  });
  server.listen(port,() => {
    console.log(`Server running at port `+port);
    hook.send(`Server running on port `+port);
  });
}

//Start turn server
function startTurnServer() {
  var Turn = require('node-turn');
  var server = new Turn({
    // set options
    authMech: 'long-term',
    listeningIps: ["0.0.0.0"],
    listeningPort: port,
    debugLevel: "ALL"
  });
  server.start();
  server.addUser("user", "pass");
  console.log("Started turn server");
  hook.send("Started turn server on port " + port);
  //Set up server listeners
  server.addListener("connection", function() {
    console.log("Connected");
    hook.send("Turn server received connection");
  });
}
startTurnServer();
