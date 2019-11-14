import { toNestedEntries } from "../helpers/nest.mjs";

export default class Collection {
  // split the string
  getFromString(propertyString) {
    const parts = propertyString.split(".");
    let property = this;

    for (let i = 0; i < parts.length; i++) {
      property = property[parts[i]];
    }

    return property;
  }

  // takes { "thing.stuff": "value", "thing.foo": "another value" }
  // and add corrensponding key/value pairs to the Collection instance
  setFromString(propertyStringObject) {
    const changes = toNestedEntries(propertyStringObject);
    changes.forEach(change => {
      Object.assign(this, change);
    });
  }

  hasPathFromString(propertyString) {
    if (this.getFromString(propertyString)) {
      return true;
    } else {
      return false;
    }
  }

  validateConditions(conditionSet) {
    let validity = true;
    Object.entries(conditionSet).forEach(entry => {
      console.log("checking context has", entry);
      if (validity) {
        validity = this.getFromString(entry[0]) === entry[1];
        console.log(validity);
      }
    });
    return validity;
  }
}
