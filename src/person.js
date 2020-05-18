class Person {
    constructor(name="Default", age=0){
        this.name = name;
        this.age =age;
    }
    toJSON(){
        return JSON.stringify({
            name: this.name,
            age: this.age,
        })
    }
}

console.log("exp01");
module.exports = Person;