function Dog (name, color = 'white') {
    this.name = name;
    this.color = color;
}

class Dog1 {
    bark() {
        return 'gav gav';
    }
    toString() {
        return `Hi, ${this.bark()}, my name is ${this.name} and my color is ${this.color}`;
    }
}

Dog1.prototype.constructor = Dog

Dog.prototype = Dog1.prototype;

const taksa = new Dog('Alma', 'brown');

console.log(taksa.toString());

const taksa1 = new Dog1('Alma', 'brown');

console.log(taksa1.toString());
console.log(Dog.prototype === Dog1.prototype);

const f = new Function();
delete  f.prototype;
console.log(new f())

console.log(Reflect.ownKeys(f))
