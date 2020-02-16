function Person(name){
  if(!(this instanceof Person))
    return new Person(name)
  this.name = name
}
exports.Person = Person