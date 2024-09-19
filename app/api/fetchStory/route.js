import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req, res) {
  const { link } = await req.json();

  //validate the link
  //link cannot be "" as we have handled that in frontend
  // Validate the link
  try {
    new URL(link);
    console.log("Link received");
  } catch (error) {
    return NextResponse.json({ msg: "Invalid link" }, { status: 400 });
  }

  try{
    const story = await scrapeStory(link);
    console.log("Story has been scraped");
    console.log(story);
    return NextResponse.json({ story }, { status: 200 });
  }catch(error){
    console.error("Error: ", error);
    return NextResponse.json({ msg: "Error scraping story" }, { status: 500 });
  }
  
} 

async function scrapeStory(url) {
  let story = "...";
  let flag = true;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    while (flag) {
      await page.goto(url);

      // Simulate scrolling down to load more content as necessary
      await autoScroll(page);

      // Extract content
      const content = await page.evaluate(() => {
        const elements = document.querySelectorAll(".aa_ht");
        return Array.from(elements)
          .map((el) => el.textContent)
          .join("\n");
      });
      story += ` \n${content}`;

      // Extract the "Next Page" link
      const nextPageLink = await page.evaluate(() => {
        const linkElement = document.querySelector(
          'a.l_bJ.l_bL[title="Next Page"]'
        );
        return linkElement ? linkElement.getAttribute("href") : null;
      });

      if (nextPageLink) {
        url = nextPageLink;
      } else {
        flag = false; // No next page link found, so stop scraping.
      }
    }
  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    await browser.close();
  }

  return story;
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 1000;
      const scrollDelay = 10;

      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, scrollDelay);
    });
  });
}