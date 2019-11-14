import { toNestedEntries } from "./story_components/helpers/nest.mjs";

//import Store from "./story_components/store/index.mjs";
import Context from "./story_components/context/index.mjs";
import Corpus from "./story_components/corpus/index.mjs";
import myCorpus from "../assets/project/myCorpus.mjs";

const headerElement = document.getElementById("page-header");
const titleElement = document.getElementById("page-title");
const textElement = document.getElementById("text");
const actionButtonsElements = document.getElementById("choice-buttons");

const corpus = new Corpus("Drama");
Object.assign(corpus, myCorpus);

const context = new Context();
const current = context.reading.current;

function startReading() {
  showPage("role", "START");
}

function showPage(key, value) {
  // display first page object with corresponding key/value pair
  const page = getPage(key, value);
  context.setCurrent(page);
  showHeader(page);
  showContent(page);
}

function getPage(key, value) {
  // return first page with corresponding key/value pair
  const page = corpus.main.find(
    folio => folio.type === "PAGE" && folio[key] === value
  );
  return page;
}

function showHeader(page) {
  let header;
  if (page.title) {
    header = `${page.title}  ■  p.${page.id}`;
    renderHeader(header);
  } else {
    header = `p.${page.id}`;
    renderHeader(header);
  }
}

function renderHeader(header) {
  headerElement.innerText = header;
}

function showContent(page) {
  clearActions();
  showTitle(page);
  renderCurrentFragment(page);
  showPossibleActions(page);
}

function renderCurrentFragment() {
  // TODO validate fragments with 'requiredContext'
  const page = corpus.main.find(page => page.id === current.page);
  textElement.innerText = page.fragments[current.fragmentIndex].text;
}

function showTitle(page) {
  // display title only when displaying the first fragment
  if (current.fragmentIndex === 0 && page.title) {
    renderTitle(page);
  } else {
    hideTitle();
  }
}

function hideTitle() {
  titleElement.classList.add("hidden");
}

function renderTitle(page) {
  titleElement.classList.remove("hidden");
  titleElement.innerText = page.title;
}

function showPossibleActions(page) {
  showPageActions(page);
  /* renderDynamicChoicesButtons()*/

  // rounding last choice button
  if (actionButtonsElements.lastChild) {
    actionButtonsElements.lastChild.classList.add("rounded-bottom");
  }
}

function showPageActions(page) {
  if (current.fragmentIndex >= current.fragmentsArrayLength - 1) {
    renderStaticChoicesButtons(page);
    console.log("Last fragment reached. Rendering page choices");
  } else {
    renderNextButton(page);
    console.log(
      `${current.fragmentsArrayLength -
        current.fragmentIndex} Fragments remaining in page. Rendering next button`
    );
  }
  console.log(
    `showing fragment ${current.fragmentIndex + 1} of ${
      current.fragmentsArrayLength
    }`
  );
}

function clearActions() {
  //clears all previously shown choice buttons
  while (actionButtonsElements.firstChild) {
    actionButtonsElements.removeChild(actionButtonsElements.firstChild);
  }
}

function renderNextButton(page) {
  const nextButton = document.createElement("button");
  nextButton.innerHTML =
    page.fragments[current.fragmentIndex].buttonText || "N E X T ";
  const nextIcon = document.createElement("i");
  nextIcon.innerHTML = "double_arrow";
  nextIcon.classList.add("btn-icon", "material-icon");
  nextButton.appendChild(nextIcon);
  nextButton.classList.add("choice-btn", "next-btn");
  nextButton.addEventListener("click", () => {
    console.log("'next' button was clicked");
    selectNextFragment(page);
  });
  actionButtonsElements.appendChild(nextButton);
}

function selectNextFragment(page) {
  if (current.fragmentIndex < current.fragmentsArrayLength) {
    current.fragmentIndex += 1;
    showContent(page);
  }
}

function renderStaticChoicesButtons(page) {
  //populate the button grid with choices from the page
  if (page.choices) {
    page.choices.forEach(choice => {
      if (verifyChoice(choice)) {
        const button = document.createElement("button");
        button.innerHTML = choice.caption;
        button.classList.add("choice-btn");
        button.addEventListener("click", () => setContextFromChoice(choice));
        actionButtonsElements.appendChild(button);
      }
    });
  }
}

function renderDynamicChoicesButtons() {
  // TODO
}

function verifyChoice(choice) {
  return (
    choice.requiredContext == null ||
    context.validateConditions(choice.requiredContext)
  );
  /*Object.entries(toNestedEntries(choice.requiredContext)).every(
      key => context[key] === toNestedEntries(choice.requiredContext)[key]
    )*/
}

function setContextFromChoice(choice) {
  current.fragmentIndex = 0;
  if (choice.setContext) {
    //return an array of objects that can be merged with the context
    const changes = toNestedEntries(choice.setContext);
    // merge
    changes.forEach(change => {
      Object.assign(context, change);
    });

    console.log(`updated context`);
    console.log(context);
  }
  context.updateHistory(current.page);
  showPage("id", choice.targetFolio);
}

function getCandidateFolios() {
  const anchorableFolios = corpus.filter(folio => folio.anchor);
  console.log(
    `Found ${anchorableFolios.length} anchorable Folio(s)`,
    anchorableFolios
  );
}

/*function readAnchor(anchor) {
  switch (typeof anchor) {
    case "string":
      readConditions(anchor);
      break;
    case "object":
      console.log("anchor is an object : ignoring");
      break;
  }
}*/

startReading();
