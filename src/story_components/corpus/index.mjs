import * as Axis from "./axes_classes";
import dynamicClass from "../helpers/dynamicClass.mjs";

class Corpus {
  constructor(axisType) {
    this.main = {
      mainAxis: {},
      main: []
    };
    this.main.mainAxis = new dynamicClass(
      Axis.PointAxesClasses,
      axisType,
      ("Main axis", "CORPUS")
    );
    this.threads = { threads: [] };
    this.dynamic = { dynamic: [] };
  }
}

export default Corpus;
