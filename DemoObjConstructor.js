var
 expect = require('expect')


/**
 * let demo = new Object()
 * internally, it does this: demo.__proto__  =  Object.constructor.prototype
 * or in another notation, [[prototype]] of demo is assigned the value of Object.constructor.prototype,
 * [[prototype]] represents the prototype object in the prototype chain, which is also a property
 * of demo object, but it is internal, thus they use [[]] this notation, and is not directly 
 * accessible in any code(demo.__proto__ return the prototype object, but its unstandard). the functionality 
 * of using constructor function, and "constructr.prototype" is provide a mechanism to assign a prototype to
 * the new object at creation time.
 * to change demo.__prototype__ after creation, use Object.setPrototypeOf(demo, newProtoObj)
 */


/**
 * 
 * @param {1} proto  a prototype object, that is used to replacing the
 * currect value of the 
 */
let DemoCreator = (proto)=>{
  let retVal = {}
  retVal.__proto__ = proto
  return retVal
}


let DemoCreatorWithParentCreator = (ParentCreator)=>{
  return retVal = Object.setPrototypeOf({}, ParentCreator.prototype)
}


/**main execution part */
/**
 * you can't use arrow function to declare a constructor, because invocation
 * context is different for function(){} and ()=>{}
 * In arrow function, the keyword this will use the value of the external 
 * this, depending on the location the function invoked.
 * where as invoking function(){} will give a null context during invokation
 */
let Tim = function(){ 
  this.brand = 'tim'
}

let Star = function(){
  this.brand = 'starbucks'
}

console.log('creating Tim brand coffee')
let myCoffee = new Tim()
expect(myCoffee).toBeInstanceOf(Tim)
console.log('creating Starbucks brand coffee, use my own machine "DemoCreator"')
let myHomeBrew = DemoCreator(Star.prototype)
expect(myHomeBrew).toBeInstanceOf(Star)


console.log('creating a authentic Homebrew use my own method and my machine#2: "DemoCreatorWithParentCreator"')
let myAuthenticHomeBrew = 
  DemoCreatorWithParentCreator(
    (function(){
      let HouseBlend = function (brand){this.brand = brand}
      HouseBlend.prototype.brand = 'my house blend'
      return HouseBlend
    })())

expect(myAuthenticHomeBrew.constructor.name).toBe('HouseBlend') //used different expect method because the constructor function is not in this scope,
//its an arg therefore a local variable inside the scope of DemoCreatorWithParentCreator()
// so you can not use the constructor expect, because it will give undefined exception

console.log("check my 1st coffee: "+myCoffee.brand)
console.log("check my 2nd coffee: "+myHomeBrew.brand) //out put undefined, because ln23~25 is not newing object, therefore this.brand="tim" 
  //is never executed, instead, we have only assigned DemoCreator.prototype to retVal.__proto__. btw, this.*** inside a constructor function
  //is utilized by the new operator only, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
console.log("check my 3rd coffee: "+myAuthenticHomeBrew.brand)