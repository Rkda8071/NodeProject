var quoridor = {
    is_my_turn: Boolean,
    socket: null,
    what_you_do: Number,
    direction: Number,
    init: function (socket) {
        var self = this;
        var user_cnt = 0;
		this.is_my_turn = false;
		this.what_you_do = 0;
		//map = new Array(20, 20);
        socket = io();
        
		socket.on("game_over", function (who) {
			self.print_msg( (who + 1) +"번 플레이어가 승리했습니다!");
		});
		socket.on("print_msg", function (msg) {
			console.log(msg);
			if(self.is_my_turn) self.print_msg(msg);
		});

        socket.on("update_users", function (data, user_count) {
            console.log(data);
            user_cnt = user_count;
			self.update_userlist(data, socket);

			self.what_you_do = 0; document.getElementById("place_button").value = "Place";
			self.color_map();
        });

		socket.on("update_map", function (map) {
			console.log(map);
            $("table.quoridor-board td").each(function (i) {
				var y = parseInt(i / 17), x = i % 17;
				console.log(map[y][x]);
				/*
				$(this).css("text-decoration", "line-through");
				$(this).css("color", "lightgray");
				*/
                if (map[y][x] == 0) $(this).html('X '); // 빈 공간
                else if (map[y][x] == 1) $(this).html('V '); // 첫번째 플레이어
                else if (map[y][x] == 2) $(this).html('U '); // 두번째 플레이어
                else $(this).html('B '); // 벽 
			});
			
			//self.color_map();
        });
        //join
        socket.on("connect", function () {
            socket.emit("join", { username: $('#username').val() });
        });

        $("table.quoridor-board td").each(function (i) {
            var y = parseInt(i / 17), x = i % 17;
			$(this).click(function () {
				console.log({ y, x });
				console.log(self.is_my_turn);
				if (self.is_my_turn) {
                    if (self.what_you_do == 1 && y % 2 == 0 && x % 2 == 0) {
                        // player move
                        socket.emit("player_move", y, x);
                    } else if (self.what_you_do >= 2 && y % 2 && x % 2){
                        // place obstacle
						socket.emit("place_obstacle", y, x, self.what_you_do - 2);
                    }
                } else {
					// <알림> 차례가 아닙니다!
					self.print_msg("<알림> 차례가 아닙니다!");
                }
            });
		});
		
		$("#move_button").click(function () {
			if (self.is_my_turn) {
				if (self.what_you_do != 1) self.what_you_do = 1;
				else self.what_you_do = 0;
				self.color_map();
			}
		});
		$("#place_button").click(function () {
			if (self.is_my_turn) {
				if (self.what_you_do == 0) {
					self.what_you_do = 2;
					// $("#place_button").html("LeftRight");
					document.getElementById("place_button").value = "LeftRight";
					//$("#place_button").value() = "LeftRight";
				}
				else if (self.what_you_do == 2) {
					self.what_you_do = 4;
					document.getElementById("place_button").value = "UpDown";
				}
				else {
					self.what_you_do = 0; document.getElementById("place_button").value = "Place";
				}
				self.color_map();
			}
		});
	},
	
	// init 끝
	select_num: function (obj, socket) {
		if(this.is_my_turn && !$(obj).attr("checked")) {
			//send num to other players
			socket.emit("select", { username: $('#username').val(), num: $(obj).text() });		
			this.check_num(obj);
			this.is_my_turn = false;
		}
		else {
			this.print_msg("<알림> 차례가 아닙니다!");
		}
	},
	
	color_map: function () {
		//console.log(this.what_you_do);
		var ang = this.what_you_do;
		$("table.quoridor-board td").each(function (i) {
			var y = parseInt(i / 17), x = i % 17;
			if (ang == 0) {
				$(this).css("color", "black");
			}
			else if (ang == 1) {
				if (x % 2 == 0 && y % 2 == 0) {
					$(this).css("color", "red");
				} else {
					$(this).css("color", "lightgray");
				}
			} else {
				if (x % 2 == 1 && y % 2 == 1) {
					$(this).css("color", "red");
				} else {
					$(this).css("color", "lightgray");
				}
			}
			console.log($(this).text());
			if ($(this).text() != 'X ') $(this).css("color", "black");
			if($(this).text() == 'U ' || $(this).text() == 'V ') $(this).css("color", "blue");
		});
	},
	
	check_num: function (obj) {
		$(obj).css("text-decoration", "line-through");
		$(obj).css("color", "lightgray");
		$(obj).attr("checked", true); // 
	},
	
	update_userlist: function (data, this_socket) {
		var self = this;
		$("#list").empty();
		console.log("main - update");
		console.log(data);
		
		$.each(data, function (key, value) {
			var turn = "(-) ";
			if(value.turn === true) {
				turn = "(*) ";
				console.log(value.name);
				console.log($('#username').val());
				if (value.id == this_socket.id) {
					self.what_you_do = 0;
					self.is_my_turn = true;
				}
				else self.is_my_turn = false;
			}// else self.is_my_turn = false;

			if(value.id == this_socket.id ){
				$("#list").append("<font color='DodgerBlue'>" + turn + value.name + "<br></font>");
			}
			else{
				$("#list").append("<font color='black'>" + turn + value.name  + "<br></font>");
			}
		});
	},
	
	print_msg: function (msg) {
		$("#chatLog").append(msg + "\n");
		$('#chatLog').scrollTop($('#chatLog')[0].scrollHeight);
	}
};

$(document).ready(function () {
	quoridor.init();
});