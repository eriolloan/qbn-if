import Collection from "../collections/index.mjs";
import Corpus from "../corpus/index.mjs";

export default class Context extends Collection {
  constructor() {
    super();
    this.reading = {
      current: {
        position: { axis_00: 0 },
        page: "",
        fragmentIndex: 0,
        fragmentsArrayLength: 0
      },
      history: {
        folios: []
      }
    };

    this.drama = [];
    this.protagonist = {
      inventory: {}
    };
    this.entities = [];
  }

  updateHistory(folioID) {
    this.reading.history.folios.unshift(folioID);
    console.log(`folio with ID ${folioID} added to history`);
  }

  setCurrent(page) {
    this.reading.current.page = page.id;
    // ! this.reading.current.position = Corpus.getPosition(page.id);
    // ! getPosition must be a method of the Page class
    this.reading.current.fragmentIndex = 0;
    this.reading.current.fragmentsArrayLength = page.fragments.length;
  }
}
