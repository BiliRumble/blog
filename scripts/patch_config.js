const fs = require('fs');
const yaml = require('js-yaml');

const patch = () => {
    try {
        const doc = yaml.load(fs.readFileSync('_config.mora.yml', 'utf8'));
        doc.gitalk.client_secret = process.env.GITALK_CLIENT_SECRET;
        fs.writeFileSync('_config.mora.yml', yaml.dump(doc), 'utf8');
        console.debug('Config patched successfully.');
    } catch (e) {
        console.error(`Failed to patch config: ${e.message}`)
    }
}

module.exports = {
    patch
}