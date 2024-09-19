import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { story, people, places, customPeople, customPlaces } =
      await req.json();
    const customizedStory = await replaceWords(
      story,
      people,
      places,
      customPeople,
      customPlaces
    );
    return NextResponse.json(
      { modifiedStory: customizedStory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { error: "Failed to process the story" },
      { status: 500 }
    );
  }
}

function replaceWords(story, people, places, customPeople, customPlaces) {
  let updatedStory = story;

  //replace people
  people.forEach((person, index) => {
    const replacement = customPeople[index]; //make sure default customPeople value == people

    if (replacement != person) {
      const regex = new RegExp(person, "g"); //globally replace all instances
      updatedStory = updatedStory.replace(regex, replacement);
    }
  });

  //replace places
  people.forEach((place, index) => {
    const replacement = customPlaces[index]; //make sure default customPlaces value == places

    if (replacement != place) {
      const regex = new RegExp(place, "g"); //globally replace all instances
      updatedStory = updatedStory.replace(regex, replacement);
    }
  });

  return updatedStory;
}
