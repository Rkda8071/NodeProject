// 3. 배열
let arr = [1, 2, 3, 4, 5];
console.log(arr.length);
console.log(arr[2]);

let arr2 = [1, 2, "apple", "banana"];
console.log(arr2[arr2.length - 1]);

//반복문
for (i = 0; i < arr2.length; i++){
    console.log(arr2[i]);
}
// for-in
for (i in arr2) {
    console.log(i);
}
// for-of (ES6)
for (i of arr2) {
    console.log(i);
}

// index, howmany(삭제), elements..
let a = ["a", "b", "c"];
// a,d,b,c
a.splice(1, 0, "d");
for (i of a) {
    console.log(i);
}

let b = [1, 2, 3, 4, 5];
console.log(b.slice(0, 2));

const result = b.find((item) => item >= 3);
console.log(result);