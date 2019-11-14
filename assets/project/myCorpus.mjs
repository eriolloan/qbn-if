const myCorpus = {
  axis: {
    id: "axis_00",
    caption: "Drama axis for 'Main'",
    axisType: "Drama",
    partsName: "Act",
    pointsName: "Plot point",
    scope: "CORPUS",
    sections: [
      { id: "point_00", partType: "POINT", caption: "Start" },
      { id: "part_01", partType: "PART", caption: "Act I" },
      { id: "point_01", partType: "POINT", caption: "from Act I to Act II" },
      { id: "part_02", partType: "PART", caption: "Act II" }
    ]
  },
  main: [
    {
      id: 0,
      in: ["axis_00", "point_00"],
      superType: "FOLIO",
      type: "PAGE",
      role: "START",
      title: "The Blue Goo Book",
      fragments: [
        {
          superType: "FRAGMENT",
          type: "PARAGRAPH",
          text: "Open the book to read a half-baked story"
        }
      ],
      choices: [
        {
          caption: "Open the book",
          setContext: {},
          targetFolio: 1
        }
      ] // TODO replace choice with simple buttonText for the first page
    },
    {
      id: 1,
      in: ["axis_00", "section_01"],
      superType: "FOLIO",
      type: "PAGE",
      role: "START",
      title: "Where is this?",
      fragments: [
        {
          superType: "FRAGMENT",
          type: "PARAGRAPH",
          text:
            "You wake up in a strange place.\n Red leaves above you gently swing in the breeze. You stand up an look around."
        },
        {
          superType: "FRAGMENT",
          type: "PARAGRAPH",
          text:
            " It seems you fell asleep under a tree by the side of a road. Except for this peculiar red tree and the road linking one end of the horizon to another, nothing disturbs the windy meadows you woke up in.",
          buttonText: "Let's get going then !"
        },
        {
          superType: "FRAGMENT",
          type: "PARAGRAPH",
          text:
            "As you move towards the road, a sudden spark of blue light catches your eye. \n\n It only briefly appeared as you moved but it was coming from something in the grass...",
          buttonText: "...but what is this?"
        },
        {
          superType: "FRAGMENT",
          type: "PARAGRAPH",
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
      in: ["axis_00", "section_01"],
      superType: "FOLIO",
      type: "PAGE",
      title: "The Merchant",
      fragments: [
        {
          superType: "FRAGMENT",
          type: "PARAGRAPH",
          text:
            "You venture forth in search of answers.\n After miles of walking, you come accross a man sitting on a wooden chest. He looks at you, then glances at the jar you kept in your hand."
        }
      ],
      choices: [
        {
          caption: "Trade the goo for a sword",
          requiredContext: { "protagonist.inventory.blueGoo": true },
          setContext: {
            "protagonist.inventory.blueGoo": false,
            "protagonist.inventory.sword": true
          },
          targetFolio: 3
        },
        {
          caption: "Trade the goo for a shield",
          requiredContext: { "protagonist.inventory.blueGoo": true },
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
      in: ["axis_00", "section_01"],
      superType: "FOLIO",
      type: "PAGE",
      title: "Do something",
      fragments: [
        {
          superType: "FRAGMENT",
          type: "PARAGRAPH",
          text: "You need to use something."
        }
      ],
      choices: [
        {
          caption: "Use the sword",
          requiredContext: { "protagonist.inventory.sword": true },
          targetFolio: 4
        },
        {
          caption: "Use the shield",
          requiredContext: { "protagonist.inventory.shield": true },
          targetFolio: 4
        },
        {
          caption: "Use the blue goo",
          requiredContext: { "protagonist.inventory.blueGoo": true },
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
      in: ["axis_00", "section_01"],
      superType: "FOLIO",
      type: "PAGE",
      role: "END",
      title: "The End",
      fragments: [
        {
          superType: "FRAGMENT",
          type: "PARAGRAPH",
          text: "That's all folks! You reached the last page."
        }
      ]
    }
  ],
  dynamic: [
    {
      id: "dynamic_01",
      superType: "FOLIO",
      type: "PAGE",
      title: "Dynamic page insertion",
      anchor: { after: 1 },
      fragments: [
        {
          superType: "FRAGMENT",
          type: "PARAGRAPH",
          text: "This is a text from a dynamically inserted page."
        }
      ]
    }
  ]
  // TODO threads: []
};

export default myCorpus;
