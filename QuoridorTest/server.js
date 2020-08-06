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

var map = new Array(20);
for (var i = 0; i < 17; i++) map[i] = new Array(20);
var users = {};
var user_count = 0;
var turn_count = 0;
var yyy = [0, 0, 1, - 1], xxx = [1, -1, 0, 0];

function chk(y, x, target, cnt) {
    for (var i = 0; i < 4; i++) {
        var yy = y + yyy[i] * 2, xx = x + xxx[i] * 2;
        if (yy >= 0 && yy < 17 && xx >= 0 && xx < 17) {
            if (map[yy][xx] == target + 1) {
                map[yy][xx] = 0;
                return true;
            } else if (cnt == 0)
                if (map[yy][xx] == (target + 1) % 2 + 1)
                    if (chk(yy, xx, target, 1))
                        return true;
        }
    }
    return false;
}

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
			console.log("game start");
			for (var i = 0; i < 17; i++) 
				for (var j = 0; j < 17; j++) map[i][j] = 0;
		
			map[0][8] = 1;
			map[16][8] = 2;
            io.emit("update_map", map);
            //socket.broadcast.emit("game_started", data);
            users[turn_count].turn = true;
            io.sockets.emit('update_users', users);
        }
    });

    socket.on('player_move', function (y, x) {
        console.log("is it work?");
        var ang = chk(y, x, turn_count, 0);
        if (ang) {
            map[y][x] = turn_count + 1;
            // 턴넘기기
            io.sockets.emit("update_map", map);
            users[turn_count].turn = false;
            turn_count = (turn_count + 1) % 2;
            users[turn_count].turn = true;
            io.sockets.emit('update_users', users);
		} else {
            // 못 감 
			console.log("이게 아닌데");
        }
    });
    socket.on('place_obstacle', function (y, x, r) {
        var ang = (map[y][x] == 0);
        // r이 0이면 좌우 2면 상하

        for (var i = r; i < 2 + r; i++) {
            var yy = y + yyy[i], xx = x + xxx[i];
            if (map[yy][xx]) ang = false;
        }
        if (ang) {
            for (var i = r; i < 2 + r; i++) {
                var yy = y + yyy[i], xx = x + xxx[i];
                map[yy][xx] = 3;
            }
            map[y][x] = 3;
            // 턴넘기기
            io.sockets.emit("update_map", map);
            users[turn_count].turn = false;
            turn_count = (turn_count + 1) % 2;
            users[turn_count].turn = true;
            io.sockets.emit('update_users', users);
        } else {
            
            // 잘못된 선택
        }
    });

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