import * as Axis from "./axes_classes/index.mjs";
import dynamicClass from "../helpers/dynamicClass.mjs";
import Collection from "../collections/index.mjs";

class Corpus extends Collection {
  constructor(axisType) {
    super();
    this.axis = new dynamicClass(
      Axis.AxesSubTypes,
      axisType,
      ("Main axis", "CORPUS")
    );
    this.main = [];
    this.threads = [];
    this.dynamic = [];
  }

  getPosition(folioID) {
    const folio = this.main.find(folio => folio.id === folioID);
    const position = folio.in;
    return position;
  }
}

export default Corpus;
