const fs = require('fs');
const yaml = require('js-yaml');

const patch = () => {
    try {
        const doc = yaml.load(fs.readFileSync('_config.yml', 'utf8'));
        doc.hexo_submit_urls_to_search_engine.bing_token = process.env.SUB_BING_TOKEN || "<PLEASE_FILL_VERCEL_ENV>";
        fs.writeFileSync('_config.yml', yaml.dump(doc), 'utf8');
        console.debug('Config patched successfully.');
    } catch (e) {
        console.error(`Failed to patch config: ${e.message}`)
    }
}

module.exports = {
    patch
}