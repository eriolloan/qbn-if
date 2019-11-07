// Use ES6 Object Literal Property Value Shorthand to maintain a map
// where the keys share the same names as the classes themselves
// classesList must be an object of classes :
//
//      const myClassesList = {
//        ClassOne,
//        ClassTwo
//      };
//
// 'args' are passed as arguments to the instanciated object
//
// USAGE :
// new DynamicClass(myClassesList, 'ClassTwo', 'John')

class DynamicClass {
  constructor(classesList, className, args) {
    return new classesList[className](args);
  }
}

export default DynamicClass;
