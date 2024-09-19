"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function InputSection() {
  const w1 = "../assets/w1.jpg";
  const w2 = "../assets/w2.jpg";
  const w3 = "../assets/w3.jpg";
  const w4 = "../assets/w4.jpg";
  const w5 = "../assets/w5.jpg";
  const w6 = "../assets/w6.jpg"; //good
  const w7 = "../assets/w7.jpg"; //bondage
  const w8 = "../assets/w8.jpg";
  const w9 = "../assets/w9.jpg";
  const w10 = "../assets/w10.jpg";
  const gif = "../assets/GIF_LQ.GIF";

  const router = useRouter();

  const [link, setLink] = useState("");
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingLoading, setIsProcessingLoading] = useState(false);
  const [customizableEntities, setCustomizableEntities] = useState({});
  const [receivedCustomizableEntities, setReceivedCustomizableEntities] =
    useState(false);
  const [customPeople, setCustomPeople] = useState([]);
  const [customPlaces, setCustomPlaces] = useState([]);
  const [customizingStoryLoading, setCustomizingStoryLoading] = useState(false);
  const [receivedCustomizedStory, setReceivedCustomizedStory] = useState(false);
  const [customizedStory, setCustomizedStory] = useState(null);

  const [joke, setJoke] = useState("No joke for you");

  useEffect(() => {
    const fetchFacts = async () => {
      const response = await fetch("../jokes.json");
      const jokes = await response.json();
      if (jokes.length > 0) {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        setJoke(jokes[randomIndex].joke);
      }
    };

    fetchFacts();
  }, [story]);

  // Handle input field changes
  const handleChange = (event) => {
    setLink(event.target.value);
  };

  const handleReplaceChange = (event, index, type) => {
    const value = event.target.value.trim(); // Trim to handle extra spaces

    if (type === "people") {
      setCustomPeople((prevPeople) => {
        const updatedPeople = Array.isArray(prevPeople) ? [...prevPeople] : [];
        // Use default value if input is empty
        updatedPeople[index] = value || customizableEntities.people[index];
        return updatedPeople;
      });
    } else if (type === "places") {
      setCustomPlaces((prevPlaces) => {
        const updatedPlaces = Array.isArray(prevPlaces) ? [...prevPlaces] : [];
        // Use default value if input is empty
        updatedPlaces[index] = value || customizableEntities.places[index];
        return updatedPlaces;
      });
    }
  };

  const fetchStory = async () => {
    try {
      if (!link) {
        alert("Link required!");
        return;
      }
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/fetchStory", {
        method: "POST",
        body: JSON.stringify({ link }),
        headers: {
          "content-type": "application/json",
        },
      });
      // console.log(res);
      if (res.ok) {
        console.log("Yeai!");
        const data = await res.json();
        setStory(data.story);
        setIsLoading(false);
      } else {
        console.log("Story Fetching Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch the story.");
    }
  };

  const downloadStory = () => {
    if (story) {
      const blob = new Blob([story], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "story.txt";
      a.click();
      window.URL.revokeObjectURL(url);
      console.log("story downloaded");
    }
  };

  const processStory = async () => {
    try {
      setIsProcessingLoading(true);
      setReceivedCustomizedStory(false);

      const res = await fetch("http://localhost:3000/api/processStory", {
        method: "POST",
        body: JSON.stringify({ story }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json(); // Convert response to JSON
        setCustomizableEntities(data.entities); // Set only the relevant part of the response
        setReceivedCustomizableEntities(true);
        setCustomPeople(data.entities.people);
        setCustomPlaces(data.entities.places);
        setIsProcessingLoading(false);
      } else {
        console.log("Customization failed");
      }
      console.log(res);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch the story.");
    }
  };

  const customizeStory = async () => {
    try {
      setReceivedCustomizableEntities(false);
      setCustomizingStoryLoading(true);

      const res = await fetch("http://localhost:3000/api/customizeStory", {
        method: "POST",
        body: JSON.stringify({
          story,
          people: customizableEntities.people,
          places: customizableEntities.places,
          customPeople,
          customPlaces,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCustomizedStory(data.modifiedStory);
        setReceivedCustomizedStory(true);
        setCustomizingStoryLoading(false);
        console.log(customizedStory);
      } else {
        console.log("Failed to customize the story");
        setCustomizingStoryLoading(false);
      }
    } catch (error) {}
  };

  const downloadCustomizedStory = () => {
    try {
      if (customizedStory) {
        const blob = new Blob([customizedStory], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "customized_story.txt";
        a.click();
        window.URL.revokeObjectURL(url);
        console.log("customized story downloaded");
      }
    } catch (error) {
      console.error("Error in downloading custom story", error);
    }
  };

  const readStory = () => {
    if (story) {
      localStorage.setItem("storyData", story);
      router.push("/read");
    }
  };

    const readCustomizedStory = () => {
      if (customizedStory) {
        localStorage.setItem("storyData", customizedStory);
        router.push("/read");
      }
    };

  return (
    <>
      <div
        className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-800 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
        style={{
          backgroundImage: `url(${w9})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          // opacity: 1,
        }}
      >
        {/* navbar */}
        <div className=" flex justify-center items-center ml-auto  mr-auto mt-12  w-[70%] p-1 align-middle rounded-md bg-transparent ">
          <div className="mt-6 flex justify-center items-center space-x-6">
            <Link
              href="https://literotica.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2  underline font-mono hover:text-pink-700 text-white transition duration-300"
            >
              Literotica
            </Link>
            <Link
              className="px-4 py-2  underline font-mono hover:text-pink-700 text-white transition duration-300"
              href="https://coconut-paprika-828.notion.site/Literotica-Recommendations-a11696fe58094e838e3522237d11c042?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Recommendations
            </Link>
            <Link
              className="px-4 py-2  underline font-mono hover:text-pink-700 text-white transition duration-300"
              href="http://localhost:3000/terms_and_conditions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms
            </Link>
            {/* <Link
              className="px-4 py-2  underline font-mono hover:text-pink-700 text-white transition duration-300"
              href="https://coconut-paprika-828.notion.site/Literotica-Recommendations-a11696fe58094e838e3522237d11c042?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </Link> */}
            <Link
              className="px-4 py-2  underline font-mono hover:text-pink-700 text-white transition duration-300"
              href="http://localhost:3000/read"
              target="_blank"
              rel="noopener noreferrer"
            >
              Story Viewer
            </Link>
          </div>
        </div>

        {/*  */}
        <div className="  rounded-md justify-center mt-11">
          <div className="flex justify-center mt-20 gap-4">
            <p className="text-5xl font-bold text-center lora-l text-white-700 ">
              Edit Story
            </p>
            <p className="text-5xl font-bold text-center lora-l text-pink-700">
              Enjoy Plot
            </p>
          </div>
          <div className="mt-6 relative  flex justify-center">
            <input
              type="text"
              value={link}
              onChange={handleChange}
              placeholder="Literotica's story link"
              className="w-1/4 pt-1 pl-4 font-mono pb-1 rounded-md text-white bg-transparent placeholder-white focus:outline-none border border-pink-500 playfair-display-pd"
            />
            <button
              onClick={fetchStory}
              className="ml-4 px-4 py-2 bg-pink-700 text-white lato-thin rounded-md hover:bg-pink-800"
            >
              {isLoading ? "Fetching..." : "Fetch Story"}
            </button>{" "}
          </div>
          {isLoading && (
            <div className="mt-4 p-4 ">
              <p className="text-pink-600 font-mono ml-auto mr-auto text-center justify-center">
                {joke}
              </p>
            </div>
          )}
          {/* {isLoading && (
            <div className="m-auto justify-center ml-auto">
              <img src={gif} alt="gif" />
            </div>
          )} */}
          {/* Conditionally render the components once the story is fetched */}
          {story && (
            <div className="mt-6">
              <div className="flex justify-center items-center space-x-6">
                <p
                  onClick={readStory}
                  className="px-6 py-3  text-pink-700 font-semibold  hover:text-pink-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:cursor-pointer"
                >
                  View Story
                </p>

                <p
                  onClick={downloadStory}
                  className="px-6 py-3  text-pink-700 font-semibold  hover:text-pink-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:cursor-pointer"
                >
                  Download Story
                </p>
                <p
                  className="px-6 py-3  text-pink-700 font-semibold hover:text-red-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover: cursor-pointer"
                  onClick={processStory}
                >
                  Customize Story
                </p>
              </div>
              {isProcessingLoading && (
                <div className="mt-4 p-4 ">
                  <p className="text-white font-mono ml-auto mr-auto text-center justify-center">
                    Evaluating Characters
                  </p>
                  <p className="text-pink-600 font-mono ml-auto mr-auto text-center justify-center">
                    {joke}
                  </p>
                </div>
              )}
              {console.log(customizableEntities)}

              {receivedCustomizableEntities && (
                <div>
                  <table className="mt-10 w-1/4  border border-collapse border-gray-300 justify-center m-auto">
                    <thead>
                      <tr className="border-b border-gray-300 ">
                        <th className="font-semibold font-mono border-b border-e text-pink-600 border-gray-300 p-1 text-center">
                          Characters
                        </th>
                        <th className="font-semibold font-mono border-b border-e text-pink-600 border-gray-300 p-1 text-center">
                          Replace
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customizableEntities.people.map((person, index) => (
                        <tr key={index} className="border-b border-gray-300">
                          <td className="pl-0 border-r border-gray-300 text-center font-mono">
                            {person}
                          </td>
                          <td className="pl-0 border-r border-gray-300 text-center font-mono">
                            <input
                              type="text"
                              placeholder={`Replace ${person}`}
                              className="bg-transparent focus:outline-none focus:ring-0 text-center"
                              onChange={(e) =>
                                handleReplaceChange(e, index, "people")
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <table className="mt-10 w-1/4 border-collapse border border-gray-300 m-auto">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="font-semibold font-mono border-b border-e text-pink-600 border-gray-300 p-1 text-center">
                          Places
                        </th>
                        <th className="font-semibold font-mono border-b border-e text-pink-600 border-gray-300  p-1 text-center">
                          Replace
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customizableEntities.places.map((place, index) => (
                        <tr key={index} className="border-b border-gray-300">
                          <td className="pl-0 border-r border-gray-300 text-center font-mono">
                            {place}
                          </td>
                          <td className="pl-0 border-r border-gray-300 text-center font-mono">
                            <input
                              type="text"
                              placeholder={`Replace ${place}`}
                              className=" bg-transparent focus:outline-none focus:ring-0 text-center"
                              onChange={(e) =>
                                handleReplaceChange(e, index, "places")
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex w-1/3 m-auto mt-8 gap-64 justify-center">
                    <button
                      className=" px-4 py-2 bg-pink-700 text-white lato-thin rounded-md hover:bg-pink-800"
                      onClick={customizeStory}
                    >
                      {customizingStoryLoading ? "Customizing..." : "Replace"}
                    </button>
                  </div>
                </div>
              )}

              {receivedCustomizedStory && (
                <div className="mt-6">
                  <div className="flex justify-center">
                    <div>
                      {" "}
                      <p onClick={readCustomizedStory} className="px-1 py-1 bg-black text-pink-700 font-semibold  hover:text-pink-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:cursor-pointer">
              
                        View Customized Story
                      </p>
                    </div>

                    <button
                      onClick={downloadCustomizedStory}
                      className="px-1 py-1 bg-black ml-5 text-pink-700 font-semibold  hover:text-pink-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:cursor-pointer"
                    >
                      Download Customized Story
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
