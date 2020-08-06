var express = require('express');
var app = express();
var http = require('http').Server(app); 
var io = require('socket.io')(http);    
var path = require('path');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {  
	res.render('main', { title: 'Online Quoridor Game', username: req.query.username });
});

var map = new Array(20, 20);
var users = {};
var user_count = 0;
var turn_count = 0;
var yyy = [0, 0, 1, - 1], xxx = [1, -1, 0, 0];

io.on('connection', function (socket) {
	
    console.log('user connected : ', socket.id);
	
    socket.on('join', function (data) {
        var username = data.username;
        socket.username = username;
		
        users[user_count] = {};
        users[user_count].id = socket.id;
        users[user_count].name = username;
        users[user_count].turn = false;
        user_count++;

        io.emit('update_users', users, user_count);
        if (user_count == 2) {
            console.log("start");
            socket.broadcast.emit("game_started", data);
            users[turn_count].turn = true;
            io.emit('update_users', users);
        }
    });

    socket.on('player_move', function (y, x) {
        var ang = false;
        for (var i = 0; i < 4; i++) {
            var yy = y + yyy[i] * 2, xx = x + xxx[i] * 2;
            if (yy >= 0 && yy <= 17 && xx >= 0 && xx <= 17 && map[yy][xx] == turn_count + 1) {
                map[y][x] = turn_count + 1;
                map[yy][xx] = 0;
                ang = true;
            }
        }
        if (ang) {
            io.emit("update_map", map);
            users[turn_count].turn = false;
            turn_count = (turn_count + 1) % 2;
            users[turn_count].turn = true;
            io.sockets.emit('update_users', users);
        } else {
            // 잘못된 선택
        }
    });
    socket.on('pose_obstacle', function (y, x) {
        
    });
    /*socket.on('game_start', function (data) {
		socket.broadcast.emit("game_started", data);
		users[turn_count].turn = true;
		
		io.emit('update_users', users);
    });*/
    
    socket.on('disconnect', function() {
		console.log('user disconnected : ', socket.id, socket.username);
		for(var i=0; i<user_count; i++){
			if(users[i].id == socket.id)
				delete users[i];
		}	
		user_count--;
		io.emit('update_users', users, user_count);
	});
});

http.listen(3000, function(){ //4
    console.log('server on!');
});