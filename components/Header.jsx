export default function () {
   return (
     <div
       className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(219,112,147,0.7),rgba(255,192,203,0))]"
       style={{
         backgroundImage: `url(${w9})`,
         backgroundSize: "cover",
         backgroundPosition: "center",
         backgroundBlendMode: "overlay",
         opacity: 1,
       }}
     >
       <div className="p-6 rounded-md justify-center mt-11">
         <p className="text-5xl font-extrabold text-center lora-l text-pink-700">
           Their Story, Your Way
         </p>
         <div className="mt-6 relative flex justify-center">
           <input
             type="text"
             value={link}
             onChange={handleChange}
             placeholder="Enter a story link"
             className="w-1/4 pt-1 pl-3 pb-1 rounded-md text-white bg-transparent placeholder-pink-300 focus:outline-none border border-pink-500"
           />
           <button
             onClick={fetchStory}
             className="ml-4 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-800"
           >
             {isLoading ? "Fetching..." : "Fetch Story"}
           </button>
         </div>
         {isLoading && (
           <div className="m-auto justify-center ml-auto">
             <img src={gif} alt="Loading..." />
           </div>
         )}
         {story && (
           <div className="mt-6">
             <div className="flex justify-center">
               <div>
                 <p className="text-xl font-semibold text-pink-100">
                   story.txt
                 </p>
               </div>
               <button
                 onClick={downloadStory}
                 className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800"
               >
                 Download Story
               </button>
               <button
                 className="ml-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-800"
                 onClick={processStory}
               >
                 Customize Story
               </button>
             </div>
             {isProcessingLoading && (
               <p className="text-pink-100">Processing...</p>
             )}

             {receivedCustomizableEntities && (
               <div>
                 <table className="mt-10 w-1/3 border-collapse border border-pink-300 m-auto">
                   <thead>
                     <tr>
                       <th className="font-semibold border-b border-pink-300 p-2 text-left text-pink-200">
                         Characters
                       </th>
                       <th className="font-semibold border-b border-pink-300 p-2 text-left text-pink-200">
                         Replace
                       </th>
                     </tr>
                   </thead>
                   <tbody>
                     {customizableEntities.people.map((person, index) => (
                       <tr key={index} className="border-b border-pink-300">
                         <td className="p-2 border-r border-pink-300 text-pink-100">
                           {person}
                         </td>
                         <td className="p-2">
                           <input
                             type="text"
                             placeholder={`Replace ${person}`}
                             className="bg-transparent focus:outline-none focus:ring-0 text-pink-100"
                             onChange={(e) =>
                               handleReplaceChange(e, index, "people")
                             }
                           />
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>

                 <table className="mt-10 w-1/3 border-collapse border border-pink-300 m-auto">
                   <thead>
                     <tr>
                       <th className="font-semibold border-b border-pink-300 p-2 text-left text-pink-200">
                         Places
                       </th>
                       <th className="font-semibold border-b border-pink-300 p-2 text-left text-pink-200">
                         Replace
                       </th>
                     </tr>
                   </thead>
                   <tbody>
                     {customizableEntities.places.map((place, index) => (
                       <tr key={index} className="border-b border-pink-300">
                         <td className="p-2 border-r border-pink-300 text-pink-100">
                           {place}
                         </td>
                         <td className="p-2">
                           <input
                             type="text"
                             placeholder={`Replace ${place}`}
                             className="bg-transparent focus:outline-none focus:ring-0 text-pink-100"
                             onChange={(e) =>
                               handleReplaceChange(e, index, "places")
                             }
                           />
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>

                 <div className="flex justify-center mt-6">
                   <button
                     onClick={customizeStory}
                     className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800"
                   >
                     {customizingStoryLoading
                       ? "Customizing..."
                       : "Download Customized Story"}
                   </button>
                 </div>

                 {receivedCustomizedStory && (
                   <div className="flex justify-center mt-4">
                     <button
                       onClick={downloadCustomizedStory}
                       className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800"
                     >
                       Download
                     </button>
                   </div>
                 )}
               </div>
             )}
           </div>
         )}
       </div>
     </div>
   );
}
