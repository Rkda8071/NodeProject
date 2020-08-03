//server.js

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
	res.render('main', { title: 'Online Yahtzee', username: req.query.username });
});

var dice = {};
var dice_locked = {};
var roll_cnt = 0;
var users = {};
var user_count = 0;
var turn_count = 0;

var locked_score = {};

io.on('connection', function (socket) {
    console.log('user connected : ', socket.id);
    
    // join
    // 유저 접속하면 서버에서 초기화줌
    socket.on('join', function (data) {
        var username = data.username; // 유저 이름 정하기
        socket.username = username;
		
        users[user_count] = {};
        users[user_count].id = socket.id;
        users[user_count].name = username;
        users[user_count].turn = false;
        user_count++;
		
        io.emit('update_users', users, user_count); // update_users 유저창 업데이트 해라 
    });

    // game_start   
    // 게임 시작 버튼 누르면 호출되는 함수
    // 게임 시작됨 방출하고, 순서 true로 바꿔줌
    socket.on('game_start', function (data) {
        console.log("start");
        socket.broadcast.emit("game_started", data);
        users[turn_count].turn = true;
        
        io.emit('update_users', users);
    });

    // roll
    // 주사위를 굴림
    socket.on('roll', function (data) {
        if (roll_cnt > 0) {
            --roll_cnt;
            for (var i = 0; i < 5; i++) 
                if (!dice_locked[i]) dice[i] = Math.random(1, 6); // 움직이는 이펙트?
            // 주사위도 갱신해줘야됨
            var score = {}, hap = 0;
                // 1,2,3,4,5,6 -
                // 7,8 Sum, Bonus
                // 9,10,11,12,13,14,15 3개,4개,풀하,스몰,라지,찬스,얏찌
            var cnt = {};
            for (var i = 0; i < 5; i++){
                var val = dice[i];
                hap += val;
                score[val] += val;
            }
            for (var i = 1; i <= 6; i++)
                cnt[score[i] / i]++;
            if (cnt[5]) {
                if (locked_score[15]) locked_score[15] += 100; 
                else score[15] = 50;                        // Yahtzee!
            }
            if (cnt[5] || cnt[4]) score[10] = hap;          // four of a kind
            if (cnt[5] || cnt[4] || cnt[3]) score[9] = hap; // three of a kind
            if (cnt[3] && cnt[2]) score[11] = 25;           // full house
            score[14] = hap;                                // chance
            var max = 0,cnt = 0;
            for (var i = 1; i <= 6; i++){
                if (score[i]) ++cnt;
                if (cnt > max) max = cnt;
            }
            if (max >= 4) score[12] = 30;                   // small straight
            if (max == 5) score[13] = 40;                   // large straight
            
            socket.broadcast.emit("update_scores", data, score); // 점수 갱신해줘야됨 
        }
    });
    
    // server.js - select
    socket.on('select', function (data) {
        socket.broadcast.emit("check_number", data); // 점수를 골랐음
        
        users[turn_count].turn = false;
        turn_count++; // 다음 순서로 넘겨줌
        
        if(turn_count >= user_count) { // 마지막까지 왔으면 첫번째 유저로 back
            turn_count = 0;
        }
        users[turn_count].turn = true;
        
        io.sockets.emit('update_users', users);
    });

    // server.js - disconnect
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
  