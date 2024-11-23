hexo.extend.filter.register('before_generate', () => {
  // Get first two digits of the Hexo version number
  const { version, log, locals } = hexo
  const hexoVer = version.replace(/(^.*\..*)\..*/, '$1')

  if (hexoVer < 5.3) {
    log.error('Please update Hexo to V5.3.0 or higher!')
    log.error('请升级 Hexo 至 V5.3.0+！')
    process.exit(-1)
  }

  if (locals.get) {
    const data = locals.get('data')
    if (data && data.butterfly) {
      log.error("'butterfly.yml' is deprecated. Please use '_config.mora.yml'")
      log.error("'butterfly.yml' 已弃用，请使用 '_config.mora.yml'")
      process.exit(-1)
    }
  }
})
