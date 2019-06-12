const osmosis = require("osmosis");
const validUrl = require("valid-url");

// Gets specified number of posts from Hacker News
const getPosts = async (numberOfPosts, baseUrl) => {
    const numberOfPages = Math.ceil(numberOfPosts/30);
    let posts = [];
    // Iterate over news pages
    for (i = 1; i <= numberOfPages; i++) {
        if (numberOfPosts > 30) {
            posts = posts.concat(await scrapePage(baseUrl+i, 30));
            numberOfPosts -= 30;
        } else {
            posts = posts.concat(await scrapePage(baseUrl+i, numberOfPosts));
        }
    }
    return posts;
}

// Scrapes web page for 'limit' number of posts
const scrapePage = async (url, limit) => {
    // Every post has data in firstRow and secondRow

    let firstRow = [];
    await osmosis
    .get(url)
    // set scope to 'athing' class
    .find(`.athing:lt(${limit})`)
    // parse relevant fields
    .set({
        title: 'a.storylink',
        uri: 'a.storylink@href',
        rank: '.rank',
    })
    .data(item => {
        // add to firstRow array
        firstRow.push(item);
    });
    
    let secondRow = [];
    await osmosis
    .get(url)
    // set scope to 'subtext' class
    .find(`.subtext:lt(${limit})`)
    .set({
        author: "a.hnuser",
        points: ".score",
        user: ".hnuser",
        comments: "a:last"
        })
    .data(item => secondRow.push(item));

    return combineAndFormatRows(firstRow, secondRow);
}

// Merges and formats post data from both rows
const combineAndFormatRows = (firstRow, secondRow) => {
    let allRows = [];
    for (let i = 0; i < firstRow.length; i++) {
        // merge post from both rows
        const post = {...firstRow[i], ...secondRow[i]};
        allRows.push(formatPost(post));
    }
    return allRows;
}

const formatPost = (post) => {
    let formattedPost = {};
    // formats title to handle empty and long strings
    formattedPost.title = post.title ? post.title.substring(0,256) : "NA";
    // ensures URI is valid
    formattedPost.uri = validUrl.isUri(post.uri) ? post.uri : "invalidURI";
    // formats author to handle empty and long strings
    formattedPost.author = post.author ? post.author.substring(0,256) : "NA";
    // handles empty points data and extracts integer
    formattedPost.points = post.points ? parseInt(post.points.substring(0, post.points.length - 7)) : 0;
    switch (post.comments) {
        // when no number of comments, set to 0
        case "discuss":
        case "hide":
            formattedPost.comments = 0;
            break;
        default:
            // format integer
            formattedPost.comments = parseInt(post.comments);
    }
    // handles empty rank data and extracts integer
    formattedPost.rank = post.rank ? parseInt(post.rank) : 0;
    return formattedPost;
}

module.exports = { getPosts, scrapePage, combineAndFormatRows, formatPost }