class Store {
  constructor() {
    this.entities = [{ protagonist: [] }, { character: [] }, { item: [] }];
    this.styles = [];
    this.scenes = [];
  }

  createEntity(type, entityName, readableName, description) {
    this.entities[type].push({
      [entityName]: {
        name: readableName,
        description: description
      }
    });
  }

  update() {
    //
    // TODO   get and add objects from the corpus
    //
  }
}

export default Store;
