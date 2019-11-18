class Axis {
  constructor(axisType, partsName, caption, scope) {
    this.subType = axisType;
    this.superType = "STRUCTURE";
    this.type = "AXIS";
    this.caption = caption;
    this.scope = scope;
    this.partsName = partsName;
    this.sections = []; // List of Acts, chapters, situations etc...
  }

  addPart() {
    const adress = this.caption + "." + this.partsName + this.sections.length;
    const newPart = new Part(this.partsName, this, adress);
    this.sections.push(newPart);
  }
}

class AxisWithPoints extends Axis {
  constructor(axisType, pointsName, partsName, caption, scope) {
    super(axisType, partsName, caption, scope);
    this.pointsName = pointsName;
    this.points = [];
  }

  addPart() {
    super.addPart();

    // add a point between the new section and the last one if it exists.
    if (super.sections.length > 0) {
      const adress = this.caption + "." + this.pointsName + this.points.length;
      let newPoint = new Point(this.pointsName, this, adress);
    }
  }
}

class Section {
  constructor(scope) {
    this.scope = scope;
    this.superType = "STRUCTURE";
    this.type = "SECTION";
  }
}

class Part extends Section {
  constructor(partsName, scope, adress) {
    super(adress, scope, adress);
    this.subType = "PART";
    this.partsName = partsName; // strings : ACTS, CHAPTERS, etc..
  }
}

class Point extends Section {
  constructor(pointsName, scope, adress) {
    super(adress, scope, adress);
    this.subType = "POINT";
    this.pointsName = pointsName; // strings : PLOT POINTS, TRESHOLDS, STORY SWITCHES etc...
  }
}

class Drama extends AxisWithPoints {
  constructor(caption, scope) {
    super("Drama", "Plot point", "Act", caption, scope);
  }
}

const AxesSubTypes = {
  Drama,
  AxisWithPoints
};
export default Axis;
export { Drama, AxesSubTypes };
