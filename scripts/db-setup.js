// Require ShellJS and Config
const shell = require("shelljs");
const config = require("../config");

// Local Project Constants
const wpAdmin = "developers";
const wpPassword = "Master8990!!";
const wpEmail = "test@example.com";

// Path config
shell.exec("php_path=`ls -d /Applications/MAMP/bin/php/php* | tail -1`");
shell.exec("export PATH='${php_path}/bin:$PATH'");
shell.exec("export PATH='/Applications/MAMP/Library/bin/:$PATH'");

//Create Database
shell.exec("wp db create");

// Install Wordpress
shell.exec(
	"wp core install --url=" +
		config.serverName +
		" --title='" +
		config.siteName +
		"' --admin_user=" +
		wpAdmin +
		" --admin_password=" +
		wpPassword +
		" --admin_email=" +
		wpEmail +
		" --color"
);

// Activate Theme
shell.exec("wp theme activate " + config.themeSlug + " --color");

// Activate Remaining Plugins
shell.exec("wp plugin activate --all --color");

// Setup ACF License
shell.exec("wp eval 'acf_pro_update_license(\"" + config.acfKEY + "\");'");

// Delete all Posts
shell.exec(
	'wp post delete $(wp post list --post_type="post" --format=ids) --force --color'
);

// Delete all Pages
shell.exec(
	'wp post delete $(wp post list --post_type="page" --format=ids) --force --color'
);

// Turn of Comments
shell.exec("wp option set default_comment_status closed --color");

// Create Default Pages
shell.exec(
	'wp post create --post_type=page --post_status=publish --post_title="Home" --menu_order=0 --color'
);
shell.exec(
	'wp post create --post_type=page --post_status=publish --post_title="News" --menu_order=5 --color'
);
shell.exec(
	'wp post create --post_type=page --post_status=publish --post_title="Contact" --menu_order=10 --color'
);
shell.exec(
	'wp post create --post_type=page --post_status=publish --post_title="Privacy Policy" --menu_order=50 --color'
);
shell.exec(
	'wp post create --post_type=page --post_status=publish --post_title="Styleguide" --menu_order=99 --color'
);

// Setup Permalinks Structure
shell.exec(
	'wp rewrite structure "/%year%/%monthnum%/%day%/%postname%/" --color'
);

// Create Dummy Blog Posts
shell.exec(
	"curl -N http://loripsum.net/api/5 | wp post generate --post_content --count=20 --post_author=" +
		wpAdmin +
		" --color"
);

// And we're done
shell.echo(
	"\n================================================================="
);
shell.echo("Installation is complete. username/password is listed below.");
shell.echo("");
shell.echo("URL: http://" + config.serverName);
shell.echo("Username: " + wpAdmin);
shell.echo("Password: " + wpPassword);
shell.echo("");
shell.echo(
	"=================================================================\n"
);
