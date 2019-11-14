class Page {
  constructor(id, position, title, fragmentsArray) {
    this.id = id;
    this.position = position;
    this.superType = "FOLIO";
    this.type = "PAGE";
    this.role = "";
    this.title = title;
    this.fragments = fragmentsArray;
    this.choices = [];
  }
}

const json =
  '[{ "id": 0, "type": "PAGE", "position": "point_00", "title": "Start Page", "fragments": [{ "type": "FRAGMENT", "subType": "PARAGRAPH", "text": "empty fragment"}]},{ "id": 1, "type": "PAGE", "position": "point_00", "title": "2nd Page", "fragments": [{ "type": "FRAGMENT", "subType": "PARAGRAPH", "text": "this is a second page"}]}]';

const corpusImport = JSON.parse(json);

let pages = [];

function loadPageData(pageID) {
  // find the page in the corpus
  const pageData = corpusImport.find(
    folio => folio.type === "PAGE" && folio.id === pageID
  );

  // get page data
  const position = pageData.position;
  const title = pageData.title;
  const fragmentsArray = pageData.fragments;

  // Put instantiated page in pages array
  pages.push(new Page(pageID, position, title, fragmentsArray));
}

loadPageData(1);
loadPageData(0);

console.log(pages);
