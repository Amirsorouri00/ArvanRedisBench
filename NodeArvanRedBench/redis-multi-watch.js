const redis = require("redis");

const client = redis.createClient();
client.unref();

function clientArvanRedisBench() {
  client.watch("foo", function(watchError) {
    if (watchError) throw watchError;
    
    client.get("foo", function(getError, result) {
    
    if (getError) throw getError;
    // console.log("i got foo: ", result);
      // Process result
      // Heavy and time consuming operation here to generate "bar"
  
      client
        .multi()
        .set("foo", "bar")
        .exec(function(execError, results) {
          // console.log("I set foo: ", result);
         /**
           * If err is null, it means Redis successfully attempted
           * the operation.
           */
          if (execError) throw err;
  
          /**
           * If results === null, it means that a concurrent client
           * changed the key while we were processing it and thus
           * the execution of the MULTI command was not performed.
           *
           * NOTICE: Failing an execution of MULTI is not considered
           * an error. So you will have err === null and results === null
           */
        });
    });
  });
  
}
const numExec = 2000;
const NS_PER_SEC = 1e9;
const time = process.hrtime();
for (var i = 0; i<numExec; i++) {
  console.time("dbsave");
  clientArvanRedisBench()
  console.timeEnd("dbsave");
}
const diff = process.hrtime(time);
const avg = (diff[0] * NS_PER_SEC + diff[1])/numExec;
console.log(`Benchmark took ${avg} nanoseconds for ${numExec} number of execution simulation of the ArvanService Simulation time.`)