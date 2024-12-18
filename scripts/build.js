function build() {
    // 调用pnpm build
    console.debug("Build start.")
    const { execSync } = require('child_process')
    execSync('pnpm build', { stdio: 'inherit' })
    console.debug("Build end.")
}

module.exports = {
    build
}