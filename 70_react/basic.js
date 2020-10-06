// 1. Spread 연산자 (ES6, 전개 연산자)
// 배열
const num = [1, 2, 3, 4, 5];
console.log(num);
console.log(...num);
console.log([...num]);
console.log([...num, 6]);

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a, b, rest);

// 객체
const std = { id: 1, name: "홍길동" };
const std2 = { addr: "안산", phone: "010-1234-5678" };
const std3 = { ...std, ...std2 };
console.log(std3);

// 2. 비구조화 할당 (구조 분해 할당)
// 배열
const arr = [1, 2, 3];
console.log(arr[0], arr[1], arr[2]);

//const one = arr[0];
const [one, two, three] = arr;
console.log(one);

// 객체
const obj = {
  id: 1,
  text: "hello",
};
console.log(obj.id, obj.text);

//const id = obj.id
const { id, text } = obj;

const arrobj = [
  { id: 1, text: "Hello" },
  { id: 2, text: "Hi" },
  { id: 3, text: "Bye" },
];
// arrobj[0]
const [on, tw, th] = arrobj;
console.log(on);
const [
  { id: id1, text: text1 },
  { id: id2, text: text2 },
  { id: id3, text: text3 },
] = arrobj;
console.log(id1, text1);

let c = 1;
d = 2;
[c, d] = [d, c];
console.log(c, d);

// 3. 불변성 유지
// 객체
const object = {
  a: 1,
  b: 2,
};

object.b = 3; // X -> 불변성이 유지되지 않음

const newObj = {
  ...object, // 기존 값 집어넣고
  b: 3, // 새로운 값을 덮어 씀
}; // O -> 불변성 유지

// 배열
const todo = [
  {
    id: 1,
    text: "아침 먹기",
    done: true,
  },
  {
    id: 2,
    text: "점심 먹기",
    done: false,
  },
];

// 추가
todo.push({ id: 3, text: "저녁 먹기", done: false });
console.log(todo);

// 삭제
todo.splice(1, 1);
console.log(todo);

// 수정
todo.find((todo) => todo.id === 3).done = true;

// 불변성 유지 (추가)
const inserted = todo.concat({
  id: 3,
  text: "저녁먹기",
  done: false,
});
//concat의 return은 배열

// 삭제
// todo.splice(1,1);
// console.log(todo);
// X -> 불변성이 깨짐 (이렇게 쓰지 마세요)

//불변성 유지 (삭제)
const filtered = inserted.filter((item) => item.id !== 2);
//filter의 return도 배열

//수정
//const selected = todo.find((item) => item.id === 3);
//selected.done = !selected.done;
//console.log(todo);
// X -> 불변성이 깨짐 (이렇게 쓰지 마세요)

//불변성 유지 (수정)
const toggled = filtered.map((item) =>
  item.id === 3 ? { ...item, done: !item.done } : item
);
//map의 return도 배열

//불변성 유지에 쓰이는 method들은 기존의 요소를 paste하여 새로운 것을 만드는 method들이다!

// ES6 : 계산된 속성명
const key = "name";
const obj2 = {
  [key]: "value",
};
console.log(obj2.name);
