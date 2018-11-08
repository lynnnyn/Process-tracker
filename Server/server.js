const PORT = 3000;
const HOST = 'localhost';

var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app);


const io = require('socket.io');

var redis = require('redis');

app.get('/', function (req, res) {
  res.sendfile('./test.html');
});

// set schedule to make server read data from database every seconds.
var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();
var times = [];

   for(var i=1; i<60; i++){
　　times.push(i);
}
rule.second = times;


if (!module.parent) {
    server.listen(PORT, HOST);
    const socket  = io.listen(server);
// use the subscribe method from Redis, when server get data from db, it will publish data to channel,
// and the client who subscribe to this channel will receive the publish.
    socket.on('connection', function(client) {
        const subscribe = redis.createClient(), pub = redis.createClient(), client1 = redis.createClient();
        subscribe.subscribe('realtime');

        subscribe.on("message", function(channel, message) {
        client.send(message);
        log('msg', "received from channel #" + channel + " : " + message);
    });

        client.on('message', function(msg) {
        log('debug', msg);
    });

        client.on('disconnect', function() {
        log('warn', 'disconnecting from redis');
        subscribe.quit();
        });
        console.log('redis',client1.get('my test key'));
            job = schedule.scheduleJob(rule, function(){
            client1.get('my test key', function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            console.log('GET result ->' + result);

            if (result ===('finished')) {
                log('info','result');
                pub.publish('realtime','finished');

            }
            else if (result ===('fail')) {
                log('warn','fail');
                pub.publish('realtime','fail');

            }
            else {
                pub.publish('realtime',result);
            }

            });


        });


    });

}

//print log, use for debug and test
function log(type, msg) {

    var color   = '\u001b[0m',
        reset = '\u001b[0m';

    switch(type) {
        case "info":
            color = '\u001b[36m';
            break;
        case "warn":
            color = '\u001b[33m';
            break;
        case "error":
            color = '\u001b[31m';
            break;
        case "msg":
            color = '\u001b[34m';
            break;
        default:
            color = '\u001b[0m'
    }

    console.log(color + '   ' + type + '  - ' + reset + msg);
}






