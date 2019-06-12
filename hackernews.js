const minimist = require("minimist");
const scraper = require("./scraper");
const baseUrl = "https://news.ycombinator.com/news?p=";
// Parse args from command line
const argv = minimist(process.argv.slice(2));

if (!argv.posts) {
    console.error("Error: posts option not specified");
    process.exit(1);
} else if (argv.posts < 1 || argv.posts > 100) {
    console.error("Error: incorrect number of posts specified");
    process.exit(1);
}

scraper.getPosts(argv.posts, baseUrl).then(data => {
    console.log(data);
})