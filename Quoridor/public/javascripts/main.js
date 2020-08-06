var quoridor = {
    is_my_turn: Boolean,
    socket: null,
    //map = null,
    direction: Number,
    init: function (socket) {
        var self = this;
        var user_cnt = 0;
        this.is_my_turn = false;
		//map = new Array(20, 20);
        socket = io();
        
        /*socket.on("check_number", function (data) {
            //self.where_is_it(data.num);
            self.print_msg(data.username + "님이 '" + data.id + "'을 선택했습니다.");
        });*/
		
        /*socket.on("init_attr", function (user) {
            $("table.dice-board td").each(function (i) {
                $(this).css("color", "black");
                $(this).attr("checked", false);
            });
        });*/

        socket.on("update_users", function (data, user_count) {
            console.log(data);
            user_cnt = user_count;
            self.update_userlist(data, socket);
        });

        socket.on("update_map", function (map) {
            $("table.quoridor-board td").each(function (i) {
                var y = i / 17, x = i % 17;
                if (map[y][x] == 0) $(this).html('X '); // 빈 공간
                else if (map[y][x] == 1) $(this).html('V '); // 첫번째 플레이어
                else if (map[y][x] == 2) $(this).html('U '); // 두번째 플레이어
                else $(this).html('B '); // 벽 
            });
        });
        //join
        socket.on("connect", function () {
            socket.emit("join", { username: $('#username').val() });
        });

        $("table.quoridor-board td").each(function (i) {
            var y = i / 17, x = i % 17;
            $(this).click(function () {
                if (self.is_my_turn == true) {
                    if (y % 2 == 0 && x % 2 == 0) {
                        // player move
                        socket.emit("player_move", y, x);
                    } else if (y % 2 && x % 2){
                        // pose obstacle
                        socket.emit("pose_obstacle", y, x);
                    }
                } else {
                    // <알림> 차례가 아닙니다!
                }
            });
        });
		/*
        $("table.dice-board td").each(function (i) {
            $(this).click(function () {
                if (user_cnt == 1) {
                    self.print_msg("<알림> 최소 2명부터 게임이 가능합니다.");
                }
                else {
                    if (!self.is_my_turn) self.print_msg("<알림> 차례가 아닙니다!");
                    else if (roll_cnt == 3) self.print_msg("<알림> 주사위를 한 번 이상 굴려야 선택할 수 있습니다.");
                    else if (!$(this).attr("checked")) self.select_dice(this, i, socket); // select_dice 보내기
                    else self.select_dice(this, i, socket);
                }
            });
        });
        index = 0;
        $("table.score-board td").each(function (i) {
            //$(this).html(numbers[i]);
            $(this).click(function () {
                if (user_cnt == 1) {
                    self.print_msg("<알림> 최소 2명부터 게임이 가능합니다.");
                }
                //!$(obj).attr("checked"))
                else if (!$(this).attr("checked")) {
                    if (!self.is_my_turn) self.print_msg("<알림> 차례가 아닙니다!");
                    else if (roll_cnt == 3) self.print_msg("<알림> 주사위를 한 번 이상 굴려야 점수를 선택할 수 있습니다.");
                    //else socket.emit('select_score', this, i, socket);
                    else self.select_score(this, i, socket); // select_score 보내기
                }
            });
        });
        */
    },
    update_userlist: function (data, this_socket) {
		var self = this;
		$("#list").empty();
		console.log(data);
		
		$.each(data, function (key, value) {
			var turn = "(-) ";
			if(value.turn === true) {
				turn = "(*) ";
				console.log(value.name);
				console.log($('#username').val());
				if(value.id == this_socket.id ) {
					self.is_my_turn = true;
				}
			}

			if(value.id == this_socket.id ){
				$("#list").append("<font color='DodgerBlue'>" + turn + value.name + "<br></font>");
			}
			else{
				$("#list").append("<font color='black'>" + turn + value.name  + "<br></font>");
			}
			
		});
	},
    print_msg: function (msg) {
		$("#logs").append(msg + "<br />");
		$('#logs').scrollTop($('#logs')[0].scrollHeight);
	}
}

$(document).ready(function () {
	bingo.init();
});