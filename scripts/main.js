const { patch } = require('./patch_config');
const { build } = require('./build')

const main = () => {
    patch();
    build();
}

main();