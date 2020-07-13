// 5. 객체
// 객체 선언
let a = {}; //객체는 중괄호, 배열은 대괄호
let b = new Object();
console.log(typeof a);  //object

//object = 데이터(property) + 기능(method)
// key : value
let Person = {
    age: 19,
    name: "강민",
    print() { 
        console.log("%d살 %s입니다.", this.age, this.name);
    }
};

//object.속성명(key 값) or object["속성명"]
console.log("%d살 %s입니다.", Person.age, Person.name);
console.log("%d살 %s입니다.", Person["age"], Person["name"]);
Person.print();

let score = {
    data: {
        kor:100,mat:90,eng:95
    },
    print() {
        for (subject in this.data) {
            console.log(subject + ": " + this.data[subject]);
        }
    },
    sum() {
        let obj = this.data;
        return obj.kor + obj.eng + obj.mat;
    },
    avg() {
        let 평균 = 0;
        let count = Object.keys(this.data).length;
        for(subject in this.data){
            평균 += this.data[subject];
        }
        return 평균/count;
    }
}
score.print();