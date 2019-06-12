const scraper = require("./scraper");

const firstRowPostHashim = {title: "title", uri: "http://www.test.com", rank: "3"};
const secondRowPostHashim = { author: "hashim",
        points: "23 points",
        user: "hashim",
        comments: "12 comments" };

const firstRowPostJack = {title: "second title", uri: "http://www.test.co.uk", rank: "12"};
const secondRowPostJack = { author: "jack",
        points: "9 points",
        user: "jack",
        comments: "19 comments" };

const firstRowValid = [firstRowPostHashim];
const secondRowValid = [secondRowPostHashim];
const firstRowMultipleValid = [firstRowPostHashim, firstRowPostJack];
const secondRowMultipleValid = [secondRowPostHashim, secondRowPostJack];

// test combineAndFormatRows

test("firstRow and secondRow for one post merged into one post", () => {
  expect(scraper.combineAndFormatRows(firstRowValid, secondRowValid).length).toBe(1);
});

test("data for multiple posts are merged", () => {
  expect(scraper.combineAndFormatRows(firstRowMultipleValid, secondRowMultipleValid).length).toBe(2);
});

test("combined row contains title", () => {
  expect("title" in scraper.combineAndFormatRows(firstRowValid, secondRowValid)[0]).toBeTruthy();
});

test("combined row contains uri", () => {
  expect("uri" in scraper.combineAndFormatRows(firstRowValid, secondRowValid)[0]).toBeTruthy();
});

test("combined row contains rank", () => {
  expect("rank" in scraper.combineAndFormatRows(firstRowValid, secondRowValid)[0]).toBeTruthy();
});

test("combined row contains author", () => {
  expect("author" in scraper.combineAndFormatRows(firstRowValid, secondRowValid)[0]).toBeTruthy();
});

test("combined row contains points", () => {
  expect("points" in scraper.combineAndFormatRows(firstRowValid, secondRowValid)[0]).toBeTruthy();
});

test("combined row contains comments", () => {
  expect("comments" in scraper.combineAndFormatRows(firstRowValid, secondRowValid)[0]).toBeTruthy();
});

// test formatPost

const stringOver256 = "a".repeat(280)

test("valid post title formatted correctly", () => {
  expect(scraper.formatPost({title: "title"}).title).toBe("title");
});

test("empty post title replaced with NA", () => {
  expect(scraper.formatPost({}).title).toBe("NA");
});

test("invalid length post title truncated", () => {
  expect(scraper.formatPost({title: stringOver256}).title.length).toBe(256);
});


test("valid post uri formatted correctly", () => {
  expect(scraper.formatPost({uri: "http://www.test.com"}).uri).toBe("http://www.test.com");
});

test("empty post uri replaced with invalidURI", () => {
  expect(scraper.formatPost({}).uri).toBe("invalidURI");
});

test("invalid post uri replaced with invalidURI", () => {
  expect(scraper.formatPost({uri: "test"}).uri).toBe("invalidURI");
});


test("valid post author formatted correctly", () => {
  expect(scraper.formatPost({author: "author"}).author).toBe("author");
});

test("empty post author replaced with NA", () => {
  expect(scraper.formatPost({}).author).toBe("NA");
});

test("invalid length post author truncated", () => {
  expect(scraper.formatPost({author: stringOver256}).author.length).toBe(256);
});


test("valid post points formatted correctly", () => {
  expect(scraper.formatPost({points: "12 points"}).points).toBe(12);
});

test("empty post points replaced with 0", () => {
  expect(scraper.formatPost({}).points).toBe(0);
});


test("post with comments formatted correctly", () => {
  expect(scraper.formatPost({comments: "13 comments"}).comments).toBe(13);
});

test("post with discuss option for comments replaced with 0", () => {
  expect(scraper.formatPost({comments: "discuss"}).comments).toBe(0);
});

test("post with hide option for comments replaced with 0", () => {
  expect(scraper.formatPost({comments: "hide"}).comments).toBe(0);
});


test("valid post rank formatted correctly", () => {
  expect(scraper.formatPost({rank: "17."}).rank).toBe(17);
});

test("empty post rank replaced with 0", () => {
  expect(scraper.formatPost({}).rank).toBe(0);
});