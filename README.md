# learning outcome of studying the prototype/constructor machanism 

some code I wrote to distinguish the following terms:

- `Function.prototype`;  

- `obj.__proto__`; (or the internal slot [`[[prototype]]`](#`[[prototype]]`) of an obj)  

- `obj.constructor`;  


(note: "`Function`" should mean a constructor function here, but in fact any function object can be used with new, i.e a function don't utilize __`this`__, can be `new`ed, but it won't assign "instance variables" but still assign its prototype property to the obj on the left side of assignment)


todo: mechanism of `[[prototype]]`