const argv = require('minimist')(process.argv.slice(2));

if (!argv.posts) {
    console.error("Error: posts option not specified");
    process.exit(1);
}

const numberOfPages = Math.ceil(argv.posts/30);
console.log(numberOfPages);