//  turns flat objects with keys expressing object paths
//  in dot notation to an array of objects.
//  Each produced object is a nested object.
//
//  Turns this :
//    { "thing.stuff": "value", "thing.foo": "another value" };
//
//  To this :
//    [{
//      thing: {
//        stuff: "value"
//      }
//    },
//    {
//      thing: {
//        foo: "another value"
//      }
//    }]

function toNestedEntries(object) {
  const entries = [];
  Object.entries(object).forEach(tempEntry => {
    let pathThing = tempEntry[0];
    let value = tempEntry[1];

    const keysInPath = pathThing.split(".");
    /*console.log("keys in path : ", keysInPath);*/

    /* assign value to last key*/
    const deepestKey = keysInPath[keysInPath.length - 1];
    const deepestEntry = { [deepestKey]: value };
    /*console.log("deepest entry : ",deepestEntry)*/

    keysInPath.pop(deepestKey);

    const nestNode = (acc, key) => {
      return { [key]: acc };
    };

    const entry = keysInPath.reduceRight(nestNode, deepestEntry);
    /*console.log("created entry : ", entry);*/
    entries.push(entry);
  });
  return entries;
}

//  turns exactly one string or array of strings expressing an
//  object path (without value) into an (empty) nested object.
//
//  Turns this :
//     "foo.bar"  OR  ["foo","bar"]
//
//  To this :
//    { foo:{ bar: {} } }

function toNestedKey(pathThing) {
  switch (typeof pathThing) {
    case "string":
      return arrayToNestedKey(pathThing.split("."));
    case "array":
      return arrayToNestedKey(pathThing);
  }
}

//  turns an array of multiple strings or arrays expressing an
//  object path (without value) into an (empty) nested object.
//
//  Turns this :
//      ["foo.bar", "things.stuff"]  OR
//      [["foo","bar"],["things", "stuff"] OR
//      ["foo.bar", ["things", "stuff"]]
//
//  To this :
//      [
//        {foo: {bar: {} }},
//        {things: {stuff: {} }}
//      ]

function toArrayOfNestedPaths(arrayOfPathThings) {
  const arrayOfPaths = [];
  arrayOfPathThings.forEach(pathThing => {
    arrayOfPaths.push(toNestedKey(pathThing));
  });
  return arrayOfPaths;
}

function arrayToNestedKey(pathArray) {
  const reducer = (acc, key) => ({ [key]: acc });
  return pathArray.reduceRight(reducer, {});
}

export { toNestedEntries, toNestedKey, toArrayOfNestedPaths };
