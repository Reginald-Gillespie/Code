const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/1006720252861759639/9-lpfflbhXJWgkpdGmDiHr5d-GwyZLEm6zR_YgQID9FpDmEGgXtIhY9DMoVpDb8WkR95");
hook.setUsername("Heroku Webhook Test");
hook.send("File is running");

var turnServer = function() {
  var Turn = require('node-turn');
  var server = new Turn({
    // set options
    authMech: 'long-term',
    listeningIps: ["0.0.0.0"],
    listeningPort: 8080,
    debugLevel: "ALL"
  });
  server.start();
  server.addUser("user", "pass");
  console.log("Started turn server");
  //Set up server listeners
  server.addListener("connection", function() {
    console.log("Connected");
  });
}
