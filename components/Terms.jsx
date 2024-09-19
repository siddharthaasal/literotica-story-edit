// app/terms/page.js

import React from "react";

const Terms = () => {
  const background = "../assets/w9.jpg";

  return (
    <div
      className="absolute mt-8 z-[-2] h-screen w-screen bg-neutral-950 "
      
    >
      <header className=" text-center">
        <h1 className="text-4xl font-bold playfair-display-pd underline text-white transition duration-300 hover:text-pink-700">
          Terms and Conditions
        </h1>
      </header>
      <main className="flex-grow p-6 mx-auto max-w-4xl">
        <section className="p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 lora-thin text-white">
            Welcome to Our Site
          </h2>
          <p className="mb-4 lora-thin text-white">
            Please read our terms and conditions carefully to ensure a
            delightful experience. By using our site, you agree to the
            following:
          </p>

          <h3 className="text-xl font-semibold mb-2 lora-thin text-pink-700">
            Age Restriction
          </h3>
          <p className="mb-4 text-white">
            You must be <strong>18 years</strong> or older to access and use
            this site. Our content is intended for mature audiences only.
          </p>

          <h3 className="text-xl font-semibold mb-2 lora-thin text-pink-700">
            Entertainment Purposes
          </h3>
          <p className="mb-4 text-white">
            All content on this site is provided for{" "}
            <strong>entertainment purposes only</strong>. We strive to offer an
            engaging experience, but remember that the primary goal is enjoyment
            and fantasy.
          </p>

          <h3 className="text-xl font-semibold mb-2 lora-thin text-pink-700">
            Content Ownership
          </h3>
          <p className="mb-4 text-white">
            All content on this site, including stories and images, is the
            intellectual property of <a href="https://literotica.com">Literotica</a>. Unauthorized
            reproduction or distribution of this content is strictly prohibited.
          </p>

          <h3 className="text-xl font-semibold mb-2 lora-thin text-pink-700">
            Prohibited Actions
          </h3>
          <p className="mb-4 text-white">
            You are{" "}
            <strong>
              not permitted to reproduce, distribute, or create derivative works
            </strong>{" "}
            from any content found on this site. Respect the intellectual
            property and creativity that goes into our offerings.
          </p>

          
          <p className="mt-6 text-center text-white">
            By using our site, you acknowledge that you have read, understood,
            and agree to these terms and conditions.
          </p>

          <p className="mt-6 text-center text-white">
            Enjoy your stay and may your imagination be ever tantalized!
          </p>

          <p className="mt-6 text-center text-white">
            <small>Last updated: September 14, 2024</small>
          </p>

          {/* <footer className="mt-6 text-center text-white">
            <p>
              Feel free to reach out with any questions or concerns at{" "}
              <a
                href="mailto:contact@example.com"
                className="text-pink-500 underline"
              >
                contact@example.com
              </a>
              .
            </p>
          </footer> */}
        </section>
      </main>
    </div>
  );
};

export default Terms;
