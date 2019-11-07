/*
function to turn flat objects with keys expressing object paths in dot notation
to an array of objects. Each produced object is a nested object.

Turns this :
  { "thing.stuff": "value", "thing.foo": "another value" };

To this :
  [{
    thing: {
      stuff: "value"
    }
  },
  {
    thing: {
      foo: "another value"
    }
  }]
*/

function toNestedObject(object) {
  const entries = [];
  Object.entries(object).forEach(tempEntry => {
    let pathStringArray = tempEntry[0];
    let value = tempEntry[1];

    const keysInPath = pathStringArray.split(".");
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

export default toNestedObject;
