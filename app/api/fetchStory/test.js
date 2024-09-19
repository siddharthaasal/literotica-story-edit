import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request) {
  try {
    const { link } = await request.json();

    if (!link || typeof link !== "string" || !isValidUrl(link)) {
      return NextResponse.json({ message: "Invalid link" }, { status: 400 });
    }

    const story = await scrapeStory(link);

    return NextResponse.json({ story }, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function scrapeStory(url) {
  let story = "Let's begin...";
  let flag = true;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    while (flag) {
      await page.goto(url);

      // Simulate scrolling down to load more content if necessary
      await autoScroll(page);

      // Extract content
      const content = await page.evaluate(() => {
        const elements = document.querySelectorAll(".aa_ht");
        return Array.from(elements)
          .map((el) => el.textContent)
          .join("\n");
      });
      story += `\n${content}`;

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

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
