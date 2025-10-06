<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 */

// Load Composer dependencies.
require_once( __DIR__ . '/../../../vendor/autoload.php' );

// Dependencies for SVG loader
require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-base.php';
require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-direct.php';

Timber\Timber::init();

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array(
  'assets/views/layouts',
  'assets/views/partials',
  'assets/views/blocks',
  'assets/views/post-types',
  'assets/views/template-parts',
  'assets/views',
  'assets',
);

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;

class FutureKingsSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {

    // Import Other Settings Files
    require_once( get_template_directory() . '/functions/speed-settings.php' );
    require_once( get_template_directory() . '/functions/acf.php' );
    require_once( get_template_directory() . '/functions/admin.php' );
    require_once( get_template_directory() . '/functions/login-page.php' );
    require_once( get_template_directory() . '/functions/responsive-images.php' );
    require_once( get_template_directory() . '/functions/utilities.php' );
    require_once( get_template_directory() . '/functions/theme-supports.php' );
    require_once( get_template_directory() . '/functions/menus.php' );

		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
    add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );

    // Clear image cache when attachments are updated
    add_action('wp_update_attachment_metadata', array($GLOBALS['fk_responsive_images'], 'clear_image_cache'), 10, 2);

    // Enqueue Scripts
    add_action( 'wp_enqueue_scripts',  array( $this, 'fk_ventures_theme_enqueue_scripts' ) );


    // Construct
		parent::__construct();
	}

  // Enqueue stylesheet & scripts

  public function fk_ventures_theme_enqueue_scripts() {

    // Custom CSS
    global $fk_utilities;
    wp_enqueue_style( 'fk_ventures-style', get_template_directory_uri() . '/assets/style.min.css', [], $fk_utilities->get_app_css_version(), false );

    // Remove Embed, Update jQuery
    if (!is_admin()) {
      wp_deregister_script('wp-embed'); // Remove WP Embed
    }

    // Scripts
    wp_register_script('lottie', 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js', array(), '5.12.2', true); // Lottie
    wp_enqueue_script( 'fk_ventures-js', get_template_directory_uri() . '/assets/scripts.min.js', array("lottie"), $fk_utilities->get_app_js_version(), true );
  }

  // Add to Context
	public function add_to_context( $context ) {
    $context['main_menu']  = Timber::get_menu('main_menu');
		$context['footer_menu']  = Timber::get_menu('footer_menu');

    if (function_exists('get_fields')) {
      $context['options'] = get_fields( 'option' );
    }
		$context['site']  = $this;


    // Latest Posts
    $context['latest_posts'] = Timber::get_posts([
      'post_type' => 'post',
      'posts_per_page' => '5',
    ]);

    // Latest Posts
    $context['all_case_studies'] = Timber::get_posts([
      'post_type' => 'case-study',
      'posts_per_page' => '-1',
      'order' => 'ASC'
    ]);



    // First Block
    function sg_get_first_block() {
        $post = get_post();
        if ( $post) {
          if(has_blocks($post->post_content)) {
            $blocks = parse_blocks($post->post_content);
            return $blocks[0]['attrs'];
          }
        }
    }
    $context['firstBlock'] = sg_get_first_block();

		return $context;
	}

	  // Add Custom Functions to Twig
  public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
    $twig->addFilter( new Twig\TwigFilter( 'slugify', function( $title ) {
			return sanitize_title( $title );
		} ) );
		$twig->addFilter( new Twig\TwigFilter( 'filetype', function( $filepath ) {
			$ext = pathinfo($filepath, PATHINFO_EXTENSION);
			return $ext;
		} ) );
		$twig->addFilter( new Twig\TwigFilter( 'filesize', function( $bytes ) {
			global $fk_utilities;
			return $fk_utilities->FileSizeConvert($bytes);
		} ) );

     //Get the timezone from Wordpress and use the extension to set the timezone
     $timezone = get_option('timezone_string');
     $twig->getExtension(\Twig\Extension\CoreExtension::class)->setTimezone($timezone);


    // Reading Time
    $twig->addFunction(new \Twig\TwigFunction('readingTime', function ($postID) {
      $content = get_the_content($postID);
      $average_reading_rate = 200;
      $word_count_type = wp_get_word_count_type();
      $newWordCount = str_word_count( strip_tags( strip_shortcodes(get_post_field( 'post_content', $postID ))));
      // $readingtime = max( 1, (int) round( wp_word_count( $content, $word_count_type ) / $average_reading_rate ) );
      $readingtime = max( 1, (int) round( $newWordCount / $average_reading_rate ) );
      $totalreadingtime = $readingtime . ' min read';
      return $totalreadingtime;
    } ) );

    // LoadSVGContents
    $twig->addFunction(new \Twig\TwigFunction('loadSvgContents', function ($path) {
      $filesystem = new WP_Filesystem_Direct( true );
      return $filesystem->get_contents($path);
    } ) );

    // Add responsive image Twig functions
    global $fk_responsive_images;
    $fk_responsive_images->add_twig_functions($twig, $fk_responsive_images);

    // Update Video Embed
    $twig->addFunction(new \Twig\TwigFunction('videoEmbed', function ($iframe, $autoplay) {
      // Use preg_match to find iframe src.
      preg_match('/src="(.+?)"/', $iframe, $matches);
      $src = $matches[1];

      // If youtube or vimeo
      $params = array();
      if (str_contains($iframe, "vimeo")) {
        $params = array(
          'autoplay' => $autoplay ? 1 : 0,
          'loop' => $autoplay ? 1 : 0,
          'title' => 0,
          'byline' => 0,
          'portrait'  => 0,
          'muted' => $autoplay ? 1 : 0,
          'background' => $autoplay ? 1: 0,
          'color' => 'ffd95a'
        );
      } elseif (str_contains($iframe, "youtube")) {
        $params = array(
          'autoplay' => $autoplay ? 1 : 0,
          'controls' => $autoplay ? 0 : 1,
          'loop' => $autoplay ? 0 : 1,
          'mute' => $autoplay ? 1 : 0,
        );
      }

      $new_src = add_query_arg($params, $src);
      $iframe = str_replace($src, $new_src, $iframe);

      // Add extra attributes to iframe HTML.
      $attributes = 'allow="autoplay; fullscreen"';
      $iframe = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $iframe);

      return $iframe;

    } ) );

		return $twig;
	}

}

$fk_site = new FutureKingsSite();
global $fk_site;
