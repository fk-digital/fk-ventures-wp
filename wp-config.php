<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */


/** NOTE:
* Nothing in this file should require editing to changing: all variables for
* db connection or site config/state should be loaded from .env up above,
* so this file is 100% portable. Or portageable.
**/
/** Dotenv */
if(file_exists(__DIR__ . '/vendor/autoload.php')) {
  require_once __DIR__ . '/vendor/autoload.php';
  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
  $dotenv->load();
  $dotenv->required(['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD']);
}

/** MySQL settings - You can get this info from your friendly web host */
define('DB_NAME',           $_ENV['DB_NAME'] );
define('DB_USER',           $_ENV['DB_USER'] );
define('DB_PASSWORD',       $_ENV['DB_PASSWORD'] );
define('DB_HOST',           $_ENV['DB_HOST'] );
define( 'DB_CHARSET',       'utf8' );
define( 'DB_COLLATE',       '' );
$table_prefix =             $_ENV['TABLE_PREFIX'];

/** Authentication Unique Keys and Salts. */
define( 'AUTH_KEY',         $_ENV['AUTH_KEY'] );
define( 'SECURE_AUTH_KEY',  $_ENV['SECURE_AUTH_KEY'] );
define( 'LOGGED_IN_KEY',    $_ENV['LOGGED_IN_KEY'] );
define( 'NONCE_KEY',        $_ENV['NONCE_KEY'] );
define( 'AUTH_SALT',        $_ENV['AUTH_SALT'] );
define( 'SECURE_AUTH_SALT', $_ENV['SECURE_AUTH_SALT'] );
define( 'LOGGED_IN_SALT',   $_ENV['LOGGED_IN_SALT'] );
define( 'NONCE_SALT',       $_ENV['NONCE_SALT'] );

/** Site Protocol */
$siteProtocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443) ? 'https://' : 'http://';

/** WP-CONTENT */
define( 'WP_CONTENT_DIR',   dirname(__FILE__) . '/wp-content');
define( 'WP_CONTENT_URL',   $siteProtocol . $_SERVER['HTTP_HOST'] . getenv('BASESIR') . '/wp-content' );
define( 'WP_SITEURL',       $siteProtocol . $_SERVER['HTTP_HOST'] . getenv('BASESIR') . '/wp' );
define( 'WP_HOME',          $siteProtocol . $_SERVER['HTTP_HOST'] . getenv('BASESIR') );


/** Environment **/
define('WP_ENVIRONMENT_TYPE', $_ENV['ENVIRONMENT_TYPE'] );
/** Options are local, development, staging, production **/

if (WP_ENVIRONMENT_TYPE == 'development' || WP_ENVIRONMENT_TYPE == 'local') :
  // sets WP_DEBUG to TRUE by default:
  // https://make.wordpress.org/core/2020/07/24/new-wp_get_environment_type-function-in-wordpress-5-5/
  define('WP_DEBUG', true);
  define('DISPLAY_ERRORS', true);
  define('SAVEQUERIES', true);
  define('SCRIPT_DEBUG', true);
  define('WP_DEBUG_LOG', true );
  define('DISALLOW_FILE_MODS', false);
  define('DISALLOW_FILE_EDIT', false);

elseif (WP_ENVIRONMENT_TYPE == 'staging' || WP_ENVIRONMENT_TYPE == 'production') :
  define('DISPLAY_ERRORS', FALSE);
  define('WP_DEBUG', FALSE);
  define('WP_DEBUG_DISPLAY', FALSE);
  define('SCRIPT_DEBUG', FALSE);
  define('DISALLOW_FILE_MODS', false);
  define('DISALLOW_FILE_EDIT', false);
else :
  define('DISPLAY_ERRORS', FALSE);
  define('WP_DEBUG', FALSE);
  define('WP_DEBUG_DISPLAY', FALSE);
  define('SCRIPT_DEBUG', FALSE);
  define('DISALLOW_FILE_MODS', false);
  define('DISALLOW_FILE_EDIT', false);
endif;


/** SSL Admin */
define('FORCE_SSL_ADMIN', false);

// ACF Pro
define( 'ACF_PRO_LICENSE', $_ENV['ACF_PRO'] );

/* That's all, stop editing! Happy blogging. */
/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}
/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
