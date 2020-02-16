function Person(name){
  if(!new.target)
    return new Person(name)
  this.name = name
}

exports.Person = Person