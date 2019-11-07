function filterWithConditions(reference, conditionObject) {
  let searchPool = reference;

  console.log("recieved condition object :", Object.entries(conditionObject));
  console.log("search pool :", Object.entries(searchPool));

  Object.entries(conditionObject).forEach(condition => {
    console.log(searchPool);
    searchPool.forEach(triedObject => {
      if (triedObject[condition[0]] !== condition[1]) {
        console.log("removed from pool :", triedObject.id);
        searchPool.splice(searchPool.indexOf(triedObject), 1);
      }
    });
  });

  console.log("search results : ", searchPool);
  return searchPool;
}

export default filterWithConditions;
