const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

client.unref();
client.set("key", "value", redis.print);
client.get("key", redis.print);
