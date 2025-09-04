require('dotenv').config()
var config = {}

// Environment Variables
config.serverName = process.env.SERVER_NAME
config.dbName = process.env.DB_NAME
config.dbUser = process.env.DB_USER
config.dbPassword = process.env.DB_PASSWORD
config.dbHost = process.env.DB_HOST
config.tablePrefix = process.env.TABLE_PREFIX
config.acfKEY = process.env.ACF_KEY

// Project Details
config.siteName = 'FK Ventures'
config.themeSlug = 'fk_ventures'

// Sitemap URL
config.sitemap = 'sitemap_index.xml'

module.exports = config
