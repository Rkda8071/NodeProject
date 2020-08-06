var yahtzee = {
    is_my_turn: Boolean,
    socket: null,

    init: function (socket) {
        var self = this;
        var user_cnt = 0;
        var roll_cnt = 0;
        this.is_my_turn = false;
        
        socket = io();
        
        /*
        socket.on("check_number", function (data) {
			self.where_is_it(data.num);
			self.print_msg(data.username + "님이 '" + data.num + "'을 선택했습니다.");
        });*/

        socket.on("game_started", function (data) {
            console.log("enter the game_started");
            self.print_msg(data.username + " 님이 게임을 시작했습니다.");
            $("#start_button").hide();
        });
        
        // roll_dice
        /*socket.on("roll_dice", function (data, dice, roll_cnt) {
            console.log("roll dice");
            this.roll_cnt = roll_cnt;
            this.dice = dice;
        });*/
        socket.on("update_scores", function (data, score) {
            $("table.score-board td").each(function (i) {
                $(this).html(score[i-1]); 
            });
        });
        socket.on("update_users", function (data, user_count) {
            console.log(data);
            user_cnt = user_count;
            roll_cnt = 3;
            self.update_userlist(data, socket);
        });
        
        socket.on("connect", function () {
            socket.emit("join", { username: $('#username').val() });
        });
        var dice = {};
        for(var i=1; i<=5; i++){
			dice.push(i);
		}
        $("table.dice-board td").each(function (i) { // 주사위 5개
            $(this).html(dice[i]);
            console(dice[i]);
            $(this).click(function () {
                if (user_cnt == 1) {
                    self.print_msg("<알림> 최소 2명부터 게임이 가능합니다.");
                }
                else {
                    //self.select_dice(this, socket);
                    // 주사위 활성화 / 비활성화
                }
            });
        });

		$("#roll_button").click(function () { // 주사위 굴리기 버튼
            if (user_cnt == 1) {
                self.print_msg("<알림> 최소 2명부터 게임이 가능합니다.");
            }
            else {
                if (this.is_my_turn && roll_cnt) {
                    socket.emit('roll', { username: $('#username').val(), num: $(obj).text() });
                    roll_cnt--;
                } else {
                    if (!this.is_my_turn) self.print_msg("<알림> 차례가 아닙니다!");
                    if (!roll_cnt) self.print_msg("<알림> 주사위를 전부 굴렸습니다! (최대 3회)");
                }
                //socket.emit('roll', { username: $('#username').val() });
            }
        });

        $("#start_button").click(function () {
            if (user_cnt == 1) {
                self.print_msg("<알림> 최소 2명부터 게임이 가능합니다.");
            }
            else {
                socket.emit('game_start', { username: $('#username').val() });
                self.print_msg("<알림> 게임을 시작했습니다.");
                $("#start_button").hide();
            }
        });
    }, // init 끝

    /*where_is_it: function (num) {
        var self = this;
        var obj = null;
		
        $("table.bingo-board td").each(function (i) {
            if ($(this).text() == num) {
                self.check_num(this);
            }
        });
    },*/
	/*select_num: function (obj, socket) {
		if(this.is_my_turn && !$(obj).attr("checked")) {
			//send num to other players
			socket.emit("select", { username: $('#username').val(), num: $(obj).text() });		
			this.check_num(obj);
			
			this.is_my_turn = false;
		}
		else {
			this.print_msg("<알림> 차례가 아닙니다!");
		}
	},*/
    check_num: function (obj) {
        $(obj).css("text-decoration", "line-through");
        $(obj).css("color", "lightgray");
        $(obj).attr("checked", true);
    },
    
    /*roll_dice: function (obj, socket) {
        if (this.is_my_turn && roll_cnt) {
            socket.emit("roll", { username: $('#username').val(), num: $(obj).text() });
            roll_cnt--;
        }
    },*/
    update_userlist: function (data, this_socket) {
        var self = this;
        $("#list").empty();
        console.log(data);
		
        $.each(data, function (key, value) {
            var turn = "(-) ";
            if (value.turn === true) {
                turn = "(*) ";
                console.log(value.name);
                console.log($('#username').val());
                if (value.id == this_socket.id) {
                    self.is_my_turn = true;
                }
            }

            if (value.id == this_socket.id) {
                $("#list").append("<font color='DodgerBlue'>" + turn + value.name + "<br></font>");
            }
            else {
                $("#list").append("<font color='black'>" + turn + value.name + "<br></font>");
            }
			
        });
    },

    print_msg: function (msg) {
		$("#logs").append(msg + "<br />");
		$('#logs').scrollTop($('#logs')[0].scrollHeight);
	}
};

$(document).ready(function () {
	bingo.init();
});