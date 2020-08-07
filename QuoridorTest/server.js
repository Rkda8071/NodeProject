var express = require('express');
var app = express();
var http = require('http').Server(app); 
var io = require('socket.io')(http);    
var path = require('path');
const Queue = require('@supercharge/queue-datastructure')
//var queue = require('queue');


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
var block_count = {};
var user_count = 0;
var turn_count = 0;
var player_position = [{}, {}];
var yyy = [0, 0, 1, - 1], xxx = [1, -1, 0, 0];

function chk(y, x, target, cnt) {
    for (var i = 0; i < 4; i++) {
        var yy = y + yyy[i] * 2, xx = x + xxx[i] * 2;
        if (yy >= 0 && yy < 17 && xx >= 0 && xx < 17 && map[yy-yyy[i]][xx-xxx[i]] != 3) {
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
function obstacle_chk(y, x, target) {
    var d = new Array(20);
    for (var i = 0; i < 17; i++) d[i] = new Array(20);
    for (var i = 0; i < 17; i++) for (var j = 0; j < 17; j++) d[i][j] = 0;
    //console.log("Hello chk");
    var q = new Queue();
    q.enqueue({ y, x });
    while (!q.isEmpty()) {
        y = q.peek().y; x = q.peek().x; q.dequeue();
        //console.log({ y, x });
        if (y == target) return true;
        for (var i = 0; i < 4; i++) {
            var yy = y + yyy[i] * 2, xx = x + xxx[i] * 2;
            if (yy >= 0 && yy < 17 && xx >= 0 && xx < 17 && map[yy - yyy[i]][xx - xxx[i]] != 3 && !d[yy][xx]) {
                d[yy][xx] = 1;
                q.enqueue({ y:yy, x:xx });
            }
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
            
            player_position[0][0] = 0; player_position[0][1] = 8;
            player_position[1][0] = 16; player_position[1][1] = 8;

            block_count[0] = 10;
            block_count[1] = 10;

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
            player_position[turn_count][0] = y; player_position[turn_count][1] = x;

            if ((turn_count == 0 && y == 16) || (turn_count == 1 && y == 0)) {
                io.sockets.emit('game_over', turn_count);
            }
            else {
                // 턴넘기기
                io.sockets.emit("update_map", map);
                users[turn_count].turn = false;
                turn_count = (turn_count + 1) % 2;
                users[turn_count].turn = true;
                io.sockets.emit('update_users', users);
            }
		} else {
            // 못 감 
			console.log("이게 아닌데");
        }
    });
    socket.on('place_obstacle', function (y, x, r) {
        var ang = (map[y][x] == 0);
        // r이 0이면 좌우 2면 상하
        if (block_count[turn_count] == 0) ang = false;
        for (var i = r; i < 2 + r; i++) {
            var yy = y + yyy[i], xx = x + xxx[i];
            if (map[yy][xx]) ang = false;
        }
        if (ang) {
            block_count[turn_count]--;
            for (var i = r; i < 2 + r; i++) {
                var yy = y + yyy[i], xx = x + xxx[i];
                map[yy][xx] = 3;
            }
            map[y][x] = 3;

            /// 내일 여기 계속 만들면 됨
            if (obstacle_chk(player_position[0][0], player_position[0][1], 16) && obstacle_chk(player_position[1][0], player_position[1][1], 0)) {
                // 턴넘기기
                io.sockets.emit("update_map", map);
                io.sockets.emit('print_msg', "남은 블럭 (" + block_count[turn_count] + "/10)");
                users[turn_count].turn = false;
                turn_count = (turn_count + 1) % 2;
                users[turn_count].turn = true;
                io.sockets.emit('update_users', users);   
            } else {
                // 설치할 수 없는 곳이다.
                block_count[turn_count]++;
                for (var i = r; i < 2 + r; i++) {
                    var yy = y + yyy[i], xx = x + xxx[i];
                    map[yy][xx] = 0;
                }
                io.sockets.emit('print_msg', "<알림> 설치하면 모든 경로가 없어지는 곳입니다.");
                map[y][x] = 0;
            }
        } else {
            if (!block_count[turn_count]) io.sockets.emit('print_msg', "<알림> 더 이상 블록이 없습니다");
            else io.sockets.emit('print_msg', "<알림> 설치할 수 없는 곳입니다.");
            // 메세지 출력하기 (블록이 없다)
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