"use client";

import { useState, useEffect } from "react";

export default function Reader() {



  const [story, setStory] = useState("");
  const [fontSize, setFontSize] = useState(12);
  const [selectedFontStyle, setSelectedFontStyle] = useState("font-mono");
  const [lineSpacing, setLineSpacing] = useState(1.5);

  useEffect(() => {
    const s = localStorage.getItem("storyData");
    console.log("Retrieved storyData:", s);
    setStory(s || ""); // Default to empty string if `s` is null
  }, []);

  const changeFontSize = (action) => {
    setFontSize((prevSize) => (action === "+" ? prevSize + 1 : prevSize - 1));
  };

  const changeLineSpacing = (action) => {
    setLineSpacing((prevSpacing) =>
      action === "+" ? prevSpacing + 0.5 : prevSpacing - 0.5
    );
  };

  const changeFontStyle = (style) => {
    setSelectedFontStyle(style);
  };

  const resetStyles = () => {
    setFontSize(12);
    setSelectedFontStyle("font-mono");
    setLineSpacing(1.5);
  };

  // Convert fontSize to rem for better scalability
  const fontSizeRem = `${fontSize / 10}rem`;
  const lineHeight = `${lineSpacing}`;

      const handleUploadFile = (event) => {
        // Check if event.target.files exists and has at least one file
        if (event.target.files && event.target.files.length > 0) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target.result;
            setStory(text);
            localStorage.setItem("storyData", text); // Save the uploaded story in localStorage
          };
          reader.readAsText(file);
        } else {
          console.error("No file selected or file is undefined");
        }
      };


  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-full bg-neutral-950 ">
        {/* styling section */}
        <div className=" flex justify-center items-center ml-auto  mr-auto mt-12  w-[70%] p-1 align-middle rounded-md bg-transparent ">
          <div className="mt-6 flex justify-center items-center space-x-6 text-xl">
            <button
              onClick={() => changeFontSize("-")}
              className="px-4 py-2 font-mono rounded-md text-pink-700 hover:text-white transition duration-300"
            >
              A-
            </button>
            <button
              onClick={() => changeFontSize("+")}
              className="px-4 py-2 font-mono rounded-md text-pink-700 hover:text-white transition duration-300"
            >
              A+
            </button>
            {/* <button
              onClick={() => changeLineSpacing("-")}
              className="px-4 py-2 rounded-md text-pink-700 hover:text-white transition duration-300"
            >
              Line -
            </button>
            <button
              onClick={() => changeLineSpacing("+")}
              className="px-4 py-2  rounded-md text-pink-700 hover:text-white transition duration-300"
            >
              Line +
            </button> */}
            <button
              onClick={() => changeFontStyle("font-mono")}
              className={`px-4 py-2 rounded-md  text-pink-700 hover:text-white transition duration-300 ${
                selectedFontStyle === "font-mono" ? "text-white" : ""
              } transition duration-300`}
            >
              Mono
            </button>
            <button
              onClick={() => changeFontStyle("font-sans")}
              className={`px-4 py-2 rounded-md text-pink-700 hover:text-white transition duration-300 ${
                selectedFontStyle === "font-sans" ? "text-white" : ""
              } transition duration-300`}
            >
              Sans
            </button>
            <button
              onClick={() => changeFontStyle("font-serif")}
              className={`px-4 py-2 rounded-md text-pink-700 hover:text-white transition duration-300 ${
                selectedFontStyle === "font-serif" ? "text-white" : ""
              } transition duration-300`}
            >
              Serif
            </button>

            <button
              onClick={resetStyles}
              className="px-4 py-2 text-pink-700 hover:text-white transition duration-300"
            >
              Reset
            </button>

            <label
              htmlFor="uploadFile1"
              className="flex hover:bg-pink-800 text-white text-base px-4 py-2 outline-none rounded w-max cursor-pointer mx-auto font-mono"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 mr-2 fill-white inline"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>
              Upload
              <input
                type="file"
                id="uploadFile1"
                className="hidden"
                onChange={handleUploadFile}
              />
            </label>
          </div>
        </div>

        {/* story section */}
        {/* <div className="text-center mb-6 mt-10">
          <h1 className="text-3xl font-bold lora-l text-white mb-4">
            Enjoy Your Read
          </h1>
        </div> */}
        <div className="max-w-5xl  mx-auto mt-12 p-8 ">
          <div
            className={`prose ${selectedFontStyle} text-slate-300 `}
            style={{ fontSize: fontSizeRem, lineHeight, textAlign: "justify" }}
          >
            {story}
          </div>
        </div>
      </div>
    </>
  );
}
