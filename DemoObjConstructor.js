var expect = require('expect')

/**
 * let demo = new Object()
 * internally, it does this: demo.__proto__  =  Object.constructor.prototype
 * or in another notation, [[prototype]] of demo is assigned the value of Object.constructor.prototype,
 * [[prototype]] represents the prototype object in the prototype chain, which is also a property
 * of demo object, but it is internal, thus they use [[]] this notation, and is not directly 
 * accessible in any code(demo.__proto__ return the prototype object, but its unstandard). the functionality 
 * of using constructor function, and "constructr.prototype" is provide a mechanism to assign a prototype to
 * the new object at creation time.
 * to change demo.__proto__ after creation, use Object.setPrototypeOf(demo, newProtoObj)
 * 
 */


/**
 * functions that assign prototype object to a local object and return that object
 * they essentially do the same thing, except one is using unoffical backdoor the other 
 * using offical method
 */
let DemoCreator = (proto)=>{
  let retVal = {}
  retVal.__proto__ = proto
  return retVal
}
let DemoCreatorWithParentCreator = (ParentCreator)=>{
  return retVal = Object.setPrototypeOf({}, ParentCreator.prototype)
}


/**constructor functions*/
/**
 * 1. you can't use arrow function to declare a constructor, because invocation
 * context is different for function(){} and ()=>{}
 * In arrow function, the keyword this will use the value of the external 
 * this, depending on the location the function invoked.
 * where as invoking function(){} will give a null context during invokation
 * 2. function Tim and Star does not pass property from their prototype,
 * where as funtion StarByProto do.
 */
let Tim = function(){ 
  this.brand = 'tim'
}
let Star = function(){
  this.brand = 'starbucks'
}
let StarByProto = function(){}
StarByProto.prototype = {...Function.prototype, brand:"starbucks"}


//create some stuff and see result
//1. use new operator
console.log('creating Tim brand coffee')
let myTim = new Tim()
expect(myTim).toBeInstanceOf(Tim)

//2. use demoCreator(), this creation is a kind of a lie, explained at ln 78-81 */
console.log('creating Starbucks brand coffee, use my own machine "DemoCreator"') 
let myStar = DemoCreator(Star.prototype)
expect(myStar).toBeInstanceOf(Star)

//3. use DemoCreatorWithParentCreator()
console.log('creating a authentic Homebrew use my own method and my machine#2: "DemoCreatorWithParentCreator"')
let myAuthenticHomeBrew = 
  DemoCreatorWithParentCreator(
    (function(){
      let HouseBlend = function (brand){this.brand = brand}
      HouseBlend.prototype.brand = 'my house blend'
      return HouseBlend
    })())
/* used different expect method because the constructor function is not in this scope,
 * its an arg therefore a local variable inside the scope of DemoCreatorWithParentCreator()
 * so you can not use the constructor expect, because it will give undefined exception*/
expect(myAuthenticHomeBrew.constructor.name).toBe('HouseBlend') 
//Loging results
console.log("\nmy coffies:\ncheck my 1st coffee: "+myTim.brand)
/* output undefined, because ln23~25 is not newing object, therefore this.brand="star" 
 * is never executed, instead, we have only assigned DemoCreator.prototype to retVal.__proto__. btw, this.*** inside a constructor function
 * is utilized by the new operator only, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
 * refering back to line 61, we can tell that nyStar is indeed an instance of Star, but the caveat here is that, myStar is not instantiated
 * by new Star(), so, does not get the brand property on itself*/ 
 console.log("check my 2nd coffee: "+myStar.brand)
 //now use StarByProto to see the change
 let passPropByDirectChangeProto = DemoCreator(StarByProto.prototype)
 let passPropByNew = new StarByProto()
 console.log("check my 2nd coffee- rework-1: "+passPropByDirectChangeProto.brand)
 console.log("check my 2nd coffee- rework-2: "+passPropByNew.brand)

 console.log("check my 3rd coffee: "+myAuthenticHomeBrew.brand)