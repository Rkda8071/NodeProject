var user = {
    role: Number,
    socket: null,

    init: function (socket) {
        var self = this;
        this.is_my_turn = false;

        socket = io();

        socket.on("game_started", function (data) {
            console.log("enter the game_started");
            self.print_msg(data.username + " 님이 게임을 시작했습니다.");
            $("#start_button").hide();
        });

        
    },
}