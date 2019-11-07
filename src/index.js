import toNestedObject from "./story_components/helpers/toNestedObject.mjs";
//import Corpus from "./story_components/corpus";
import Store from "./story_components/store/index.mjs";
import filterWithConditions from "./story_components/helpers/filterWithConditions.mjs";

const headerElement = document.getElementById("page-header", "rounded-top");
headerElement.classList.add("padding-1");
const titleElement = document.getElementById("page-title");
titleElement.parentNode.classList.add(
  "horizontal-padding-4",
  "vertical-padding-0"
);
const textElement = document.getElementById("text");
textElement.classList.add("horizontal-padding-4", "vertical-padding-0", "p");
const choiceButtonsElement = document.getElementById("choice-buttons");

let context = { reading: { current: {} }, protagonist: { inventory: {} } };
const current = context.reading.current;
//const corpus = new Corpus("Drama");
const store = new Store();
/*store.createEntity(
  "item",
  "blueGoo",
  "Jar of blue goo",
  "A jar found in the grass. A thick blue liquid moves inside."
);*/
console.log(store);

function startReading() {
  context = {
    reading: {
      current: {
        axes: [{ axis: "axis_00", part: 0 }],
        page: "",
        fragmentIndex: 0,
        fragmentsArrayLength: 0
      },
      history: {
        folios: []
      }
    },
    drama: [],
    protagonist: {
      inventory: {}
    },
    entities: []
  };

  showPage("role", "START");
}

function showPage(key, value) {
  // get the page at this pageID from the corpus
  current.page = getPage(key, value);
  showHeader(current.page);
  showContent(current.page);
}

function getPage(key, value) {
  // return first page with pageID
  const page = corpus.main.find(
    folio => folio.subType === "PAGE" && folio[key] === value
  );
  setCurrent(page);
  return page;
}

function setCurrent(page) {
  current.page = page.in;
  current.page = page.id;
  current.fragmentIndex = 0;
  current.fragmentsArrayLength = page.fragments.length;
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

function showContent() {
  clearChoices();
  showTitle();
  renderCurrentFragment();
  showPossibleActions();
}

function renderCurrentFragment() {
  // TODO validate fragments with 'requiredContext'
  textElement.innerText = current.page.fragments[current.fragmentIndex].text;
}

function showTitle() {
  if (current.fragmentIndex === 0 && current.page.title) {
    renderTitle();
  } else {
    hideTitle();
  }
}

function hideTitle() {
  titleElement.classList.add("hidden");
}

function renderTitle() {
  titleElement.classList.remove("hidden");
  titleElement.innerText = current.page.title;
}

function showPossibleActions() {
  showCurrentPageActions();
}

function showCurrentPageActions() {
  if (current.fragmentIndex + 1 >= current.fragmentsArrayLength) {
    renderStaticChoicesButtons();
    console.log("Last fragment reached. Rendering page choices");
  } else {
    renderNextButton();
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

function clearChoices() {
  //clears previous choice buttons
  while (choiceButtonsElement.firstChild) {
    choiceButtonsElement.removeChild(choiceButtonsElement.firstChild);
  }
}
function renderNextButton() {
  const nextButton = document.createElement("nextButton");
  nextButton.innerHTML =
    current.page.fragments[current.fragmentIndex].buttonText || "N E X T ";
  const nextIcon = document.createElement("i");
  nextIcon.innerHTML = "double_arrow";
  nextIcon.classList.add("btn-icon", "material-icon");
  nextButton.appendChild(nextIcon);
  nextButton.classList.add("choice-btn", "next-btn", "rounded-bottom");
  nextButton.addEventListener("click", () => {
    console.log("'next' was clicked");
    selectNextFragment();
  });
  choiceButtonsElement.appendChild(nextButton);
}

function selectNextFragment() {
  if (current.fragmentIndex < current.fragmentsArrayLength) {
    current.fragmentIndex += 1;
    showContent();
  }
}

function renderStaticChoicesButtons() {
  //populate the button grid with choices from the page
  if (current.page.choices) {
    current.page.choices.forEach(choice => {
      if (verifyChoice(choice)) {
        const button = document.createElement("button");
        button.innerHTML = choice.caption;
        button.classList.add("choice-btn");
        button.addEventListener("click", () => selectChoice(choice));
        choiceButtonsElement.appendChild(button);
      }
    });
    // rounding last choice button
    choiceButtonsElement.lastChild.classList.add("rounded-bottom");
  }
}

function renderDynamicChoicesButtons() {
  //populate the button grid with choices from the page
  if (current.page.choices) {
    current.page.choices.forEach(choice => {
      if (verifyChoice(choice)) {
        const button = document.createElement("button");
        button.innerHTML = choice.caption;
        button.classList.add("choice-btn");
        button.addEventListener("click", () => selectChoice(choice));
        choiceButtonsElement.appendChild(button);
      }
    });
    // rounding last choice button
    choiceButtonsElement.lastChild.classList.add("rounded-bottom");
  }
}

function verifyChoice(choice) {
  return choice.requiredContext == null || choice.requiredContext(context);
}

function selectChoice(choice) {
  current.fragmentIndex = 0;
  if (choice.setContext) {
    //return an array of objects that can be merged with the context
    const changes = toNestedObject(choice.setContext);
    // merge
    changes.forEach(change => {
      Object.assign(context, change);
    });

    console.log(`updated context`);
    console.log(context);
  }
  updateHistory(current.page.id);
  showPage("id", choice.targetFolio);
}

function updateHistory(folioID) {
  context.reading.history.folios.unshift(folioID);
  console.log(`folio with ID ${folioID} added to history`);
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
const corpus = {
  axis: {
    id: "axis_00",
    caption: "Drama axis for 'Main'",
    axisType: "Drama",
    sectionType: "Act",
    pointType: "Plot point",
    scope: "CORPUS",
    parts: [
      { id: "point_00", partType: "point", caption: "Start" },
      { id: "section_01", partType: "section", caption: "Act I" },
      { id: "point_01", partType: "point", caption: "from Act I to Act II" },
      { id: "section_02", partType: "section", caption: "Act II" }
    ]
  },
  main: [
    {
      id: 0,
      in: "point_00",
      type: "FOLIO",
      subType: "PAGE",
      role: "START",
      title: "Random Book",
      fragments: [
        {
          type: "FRAGMENT",
          subType: "PARAGRAPH",
          text: "Press start to read"
        }
      ],
      choices: [
        {
          caption: "START",
          setContext: {},
          targetFolio: 1
        }
      ]
    },
    {
      id: 1,
      in: "section_01",
      type: "FOLIO",
      subType: "PAGE",
      role: "START",
      title: "Where is this?",
      fragments: [
        {
          type: "FRAGMENT",
          subType: "PARAGRAPH",
          text:
            "You wake up in a strange place.\n Red leaves above you gently swing in the breeze. You stand up an look around."
        },
        {
          type: "FRAGMENT",
          subType: "PARAGRAPH",
          text:
            " It seems you fell asleep under a tree by the side of a road. Except for this peculiar red tree and the road linking one end of the horizon to another, nothing disturbs the windy meadows you woke up in.",
          buttonText: "Let's get going then !"
        },
        {
          type: "FRAGMENT",
          subType: "PARAGRAPH",
          text:
            "As you move towards the road, a sudden spark of blue light catches your eye. \n\n It only briefly appeared as you moved but it was coming from something in the grass...",
          buttonText: "...but what is this?"
        },
        {
          type: "FRAGMENT",
          subType: "PARAGRAPH",
          text:
            "Searching in the cold wet grass, your hand eventually reaches a small jar filled with blue goo."
        }
      ],
      choices: [
        {
          caption: "Take the goo",
          setContext: {
            "protagonist.inventory.blueGoo": true
          },
          targetFolio: 2
        },
        {
          caption: "Leave the goo",
          targetFolio: 2
        }
      ]
    },
    {
      id: 2,
      in: "section_01",
      type: "FOLIO",
      subType: "PAGE",
      title: "The Merchant",
      fragments: [
        {
          type: "FRAGMENT",
          subType: "PARAGRAPH",
          text:
            "You venture forth in search of answers.\n After miles of walking, you come accross a man sitting on a wooden chest. He looks at you, then glances at the jar you kept in your hand."
        }
      ],
      choices: [
        {
          caption: "Trade the goo for a sword",
          requiredContext: currentContext =>
            currentContext.protagonist.inventory.blueGoo,
          setContext: {
            "protagonist.inventory.blueGoo": false,
            "protagonist.inventory.sword": true
          },
          targetFolio: 3
        },
        {
          caption: "Trade the goo for a shield",
          requiredContext: currentContext =>
            currentContext.protagonist.inventory.blueGoo,
          setContext: {
            "protagonist.inventory.blueGoo": false,
            "protagonist.inventory.shield": true
          },
          targetFolio: 3
        },
        {
          caption: "Ignore the merchant",
          targetFolio: 3
        }
      ]
    },
    {
      id: 3,
      in: "section_01",
      type: "FOLIO",
      subType: "PAGE",
      title: "Do something",
      fragments: [
        {
          type: "FRAGMENT",
          subType: "PARAGRAPH",
          text: "You need to use something."
        }
      ],
      choices: [
        {
          caption: "Use the sword",
          requiredContext: currentContext =>
            currentContext.protagonist.inventory.sword,
          targetFolio: 4
        },
        {
          caption: "Use the shield",
          requiredContext: currentContext =>
            currentContext.protagonist.inventory.shield,
          targetFolio: 4
        },
        {
          caption: "Use the blue goo",
          requiredContext: currentContext =>
            currentContext.protagonist.inventory.blueGoo,
          targetFolio: 4
        },
        {
          caption: "Do nothing",
          targetFolio: 4
        }
      ]
    },
    {
      id: 4,
      in: "section_01",
      type: "FOLIO",
      subType: "PAGE",
      role: "END",
      title: "The End",
      fragments: [
        {
          type: "FRAGMENT",
          subType: "PARAGRAPH",
          text: "That's all folks! You reached the last page."
        }
      ]
    }
  ],
  threads: [],
  dynamic: [
    {
      id: "dynamic_01",
      type: "FOLIO",
      subType: "PAGE",
      title: "Dynamic page insertion",
      anchor: { after: 1 },
      fragments: [
        {
          type: "FRAGMENT",
          subType: "PARAGRAPH",
          text: "This is a text from a dynamically inserted page."
        }
      ]
    }
  ]
};

startReading();
