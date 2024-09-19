import { NextResponse } from "next/server";
import nlp from "compromise";

export async function POST(req, res) {
  const { story } = await req.json();

  try {
    const doc = nlp(story);

    // Extract entities
    //using set to remove the duplicates
    var peopleWithPunctuatiuons = Array.from(
      new Set(doc.people().out("array"))
    );
    var placesWithPunctuatiuons = Array.from(
      new Set(doc.places().out("array"))
    );

    var people = cleanEntities(peopleWithPunctuatiuons);
    var places = cleanEntities(placesWithPunctuatiuons);

    return NextResponse.json(
      {
        entities: {
          people,
          places,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error:
          "Internal Server Error - Issue in processing the story to fetch apt context",
      },
      { status: 500 }
    );
  }
}

function cleanEntities(arr) {
  const finalSet = new Set([]);

  for (var element of arr.values()) {
    element = element.trim();

    //ignore the word with apostrophe
    if (element.length >= 2) {
      if (element.charAt(element.length - 2) == "'") {
        continue;
      }
    }

    var str = "";
    for (var i = 0; i < element.length; i++) {
      //check if the letter is an alphabet or a whitespace
      if (element.charAt(i).toUpperCase() != element.charAt(i).toLowerCase()) {
        str = str + element.charAt(i);
      } else if (element.charAt(i) == " ") {
        str = str + element.charAt(i);
      }
      //otherwise skip it
    }
    finalSet.add(str);
  }
  console.log(finalSet);

  return Array.from(finalSet);
}
