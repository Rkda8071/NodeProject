// JSON 연습
const singer = {
    name: "포켓몬마스터",
    member: ["지우", "웅이", "빛나", "피카츄"],
    songs: [
        {
            type: "Electronic",
            Evolution: 1
        },
        {
            type: "water",
            Evolution: 0
        },
    ],
};

// JSON object -> string
const str = JSON.stringify(singer);
console.log(str);

// string -> JSON object
JSON.parse(str);
const obj = JSON.parse(str);
console.log(obj);
//웅이 출력
console.log(obj.member[1]);