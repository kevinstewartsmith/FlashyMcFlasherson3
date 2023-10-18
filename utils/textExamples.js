//Make an array with 15 strings, the first item has one character but add one more character to each item in the array. the text can be in lorem ipsum
//

const textExamples = [
    "L",
    "Lo",
    "Lor",
    "Lore",
    "Lorem",
    "Lorem ",
    "Lorem i",
    "Lorem ip",
    "Lorem ips",
    "Lorem ipsu",
    "Lorem ipsum",
    "Lorem ipsum ",
    "Lorem ipsum d",
    "Lorem ipsum do",
    "Lorem ipsum dol",
    "Lorem ipsum dolo",
    "Lorem ipsum dolor",
    "Lorem ipsum dolor ",
    "Lorem ipsum dolor s",
    "Lorem ipsum dolor si",
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor sit ",
    "Lorem ipsum dolor sit a",
    "Lorem ipsum dolor sit am",
    "Lorem ipsum dolor sit ame",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet,",
    "Lorem ipsum dolor sit amet, ",
    "Lorem ipsum dolor sit amet, c",
    "Lorem ipsum dolor sit amet, co",
]

//Map through the text example array and return a new array of objects. Each object should have the keys text and length. Provide both the text and the length of the text as values for the keys.
const textExamplesWithLength = textExamples.map((text) => {
    return {
        text: text,
        length: text.length
    }
})

//array that lists the number 50 thirt times listed outright
const fiftyArray = [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50]