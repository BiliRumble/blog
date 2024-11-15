const fs = require('fs');
const yaml = require('js-yaml');

const patch = () => {
    try {
        const doc = yaml.load(fs.readFileSync('_config.butterfly.yml', 'utf8'));
        doc.gitalk.client_secret = process.env.GITALK_CLIENT_SECRET;
        fs.writeFileSync('_config.butterfly.yml', yaml.dump(doc), 'utf8');
        console.debug('Config patched successfully.');
    } catch (e) {
        console.error(`Failed to patch config: ${e.message}`)
    }
}

module.exports = {
    patch
}