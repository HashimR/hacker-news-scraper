const minimist = require("minimist");
const osmosis = require("osmosis");
const validUrl = require("valid-url");

const BASEURL = "https://news.ycombinator.com/news?p=";
const argv = minimist(process.argv.slice(2));

if (!argv.posts) {
    console.error("Error: posts option not specified");
    process.exit(1);
} else if (argv.posts > 100 || argv.posts < 1) {
    console.error("Error: incorrect number of posts specified");
    process.exit(1);
}

const getPosts = async (numberOfPosts) => {
    const numberOfPages = Math.ceil(argv.posts/30);
    let posts = [];
    for (i = 1; i <= numberOfPages; i++) {
        if (numberOfPosts > 30) {
            posts.push(await scrapePage(BASEURL+i, 30));
            numberOfPosts -= 30;
        } else {
            posts.push(await scrapePage(BASEURL+i, numberOfPosts));
        }
    }
    return posts;
}

const scrapePage = async (url, limit) => {
    let firstRow = [];
    await osmosis
    .get(url)
    .find(`.athing:lt(${limit})`)
    .set({
        title: 'a.storylink',
        uri: 'a.storylink@href',
        rank: '.rank',
    })
    .data(item => {
        firstRow.push(item);
    });
    
    let secondRow = [];
    await osmosis
    .get(url)
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

const combineAndFormatRows = (firstRow, secondRow) => {
    let allRows = [];
    for (let i = 0; i < firstRow.length; i++) {
        const post = {...firstRow[i], ...secondRow[i]};
        allRows.push(formatPost(post));
    }
    return allRows;
}

const formatPost = (post) => {
    let formattedPost = {};
    formattedPost.title = post.title ? post.title.substring(0,256) : "NA";
    formattedPost.uri = validUrl.isUri(post.uri) ? post.uri : "invalidURI";
    formattedPost.author = post.author ? post.author.substring(0,256) : "NA";
    formattedPost.points = post.points ? parseInt(post.points.substring(0, post.points.length - 7)) : 0;
    switch (post.comments) {
        case "discuss":
        case "hide":
            formattedPost.comments = 0;
            break;
        default:
            formattedPost.comments = parseInt(post.comments);
    }
    formattedPost.rank = post.rank ? parseInt(post.rank) : 0;
    return formattedPost;
}

getPosts(argv.posts).then(data => {
    console.log(data);
})