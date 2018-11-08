var redis = require('redis');
var client = redis.createClient();
client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});
// use child_process to get the output from python file.
var spawn = require('child_process').spawn;
var pyProcess = spawn("python",["job.py"]);

pyProcess.stdout.on('data', function (output) {
    var temp = String(output);
    console.log('out',temp);
    client.set('my test key', temp.trim() , redis.print);

});
pyProcess.stderr.on('data', function (output) {
    var temp = String(output);
    console.log('err',temp);
});
// there are 2 kinds close code,0 means python file do not fail,
// while 1 means python file fails before finish.
pyProcess.on('close', function (data) {
    console.log('close'+ data);
    if (data === 1){
        client.set('my test key', 'fail' , redis.print);
    }
    else if (data===0){
        client.set('my test key', 'finished' , redis.print);
    }
    client.quit();
});


