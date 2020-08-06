// server.js

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
	res.render('main', { title: 'Online Yahtzee Game', username: req.query.username });
});

var dice = {};
var dice_locked = {};
var locked_score = [[],[],[],[],[]];
var roll_cnt = 0;
var users = {};
var user_count = 0;
var turn_count = 0;

io.on('connection', function(socket){ 
	
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
	});
	
	socket.on('game_start', function (data) {
		socket.broadcast.emit("game_started", data);
		users[turn_count].turn = true;
		
		io.emit('update_users', users);
	});
	
	// roll
	// 주사위를 굴림
	socket.on('lock_dice', function (index) {
		if (dice_locked[index]) dice_locked[index] = false;
		else dice_locked[index] = true;
	});
    socket.on('roll', function (data) {
		for (var i = 0; i < 5; i++) 
			if (!dice_locked[i]) dice[i] = Math.floor(Math.random()*10%6 + 1); // 움직이는 이펙트?
		// 주사위도 갱신해줘야됨
		var score = {}, hap = 0;
			// 1,2,3,4,5,6 -
			// 7,8 Sum, Bonus
			// 9,10,11,12,13,14,15 3개,4개,풀하,스몰,라지,찬스,얏찌
		var cnt = {};
		score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		cnt = [0, 0, 0, 0, 0, 0, 0];
		for (var i = 0; i < 5; i++){
			var val = dice[i];
			hap += val;
			if (score[val]) score[val] += val;
			else score[val] = val;
		}
		for (var i = 1; i <= 6; i++) {
			var val = score[i] / i;
			if (cnt[val]) cnt[val]++;
			else cnt[val] = 1;
		}
		console.log(cnt);
		if (cnt[5]) {
			if (locked_score[turn_count][15]) locked_score[turn_count][15] += 100; 
			else score[15] = 50;                        // Yahtzee!
		}
		if (cnt[5] || cnt[4]) score[10] = hap;          // four of a kind
		if (cnt[5] || cnt[4] || cnt[3]) score[9] = hap; // three of a kind
		if (cnt[3] && cnt[2]) score[11] = 25;           // full house
		score[14] = hap;                                // chance
		var max = 0,cnt = 0;
		for (var i = 1; i <= 6; i++){
			if (score[i]) ++cnt;
			else cnt = 0;
			if (cnt > max) max = cnt;
		}
		if (max >= 4) score[12] = 30;                   // small straight
		if (max == 5) score[13] = 40;                   // large straight
		console.log(score);
		
		io.emit("update_dice_score", data, dice, score, locked_score[turn_count]); // 점수 갱신해줘야됨  // 여기서 버그난다 지금
	});
	
	socket.on('select_my_score', function (data) {
		//locked_score[]
		socket.broadcast.emit("check_score", data);
		for (var i = 0; i < 5; i++){
			dice_locked[i] = false;
		}
		locked_score[turn_count][data.id] = data.val;
		users[turn_count].turn = false;

		//turn_count++;
		
		turn_count = (turn_count + 1) % user_count;
		/*if(turn_count >= user_count) {
			turn_count = 0;
		}*/
		users[turn_count].turn = true;
		io.sockets.emit('init_attr', users);
		io.sockets.emit('update_users', users);
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

