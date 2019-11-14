import Collection from "../collections/index.mjs";

class Store extends Collection {
  constructor() {
    super();
    this.entities = [{ protagonist: [] }, { character: [] }, { item: [] }];
    this.styles = [];
    this.scenes = [];
  }

  createEntity(entityType, entityName, readableName, description) {
    this.entities[entityType].push({
      [entityName]: {
        name: readableName,
        description: description
      }
    });
  }
}

export default Store;
