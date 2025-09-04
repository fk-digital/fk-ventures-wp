<?php

  // Add Theme Support
  add_theme_support( 'automatic-feed-links' );
  add_theme_support( 'title-tag' );
  add_theme_support( 'post-thumbnails' );
  add_theme_support( 'menus' );
  add_post_type_support( 'page', 'excerpt' );
  add_theme_support( 'responsive-embeds' );
  add_theme_support(
    'html5',
    array(
      'comment-form',
      'comment-list',
      'gallery',
      'caption',
    )
  );

  // Set image size to zero to disable default image generation.
  //  Keep thumb for WP-Admin pages preview.
  update_option('medium_size_w', 0);
  update_option('medium_size_h', 0);
  update_option('medium_large_size_w', 0);
  update_option('medium_large_size_h', 0);
  update_option('large_size_w', 0);
  update_option('large_size_h', 0);

  // Default post thumbnail
  set_post_thumbnail_size( 652, 516, true);

  // Image Sizes
  add_image_size( 'post_thumb', 644, 544, true);
  add_image_size( 'person', 160, 160, true);
  add_image_size( 'post_thumb_large', 822, 600);
  add_image_size( 'hero', 1440, 700);
  add_image_size( 'content_panel', 540, 999999999);
  add_image_size( 'product', 1308, 1122);
  add_image_size( 'card_panel', 682, 860);


// Allow JSON Uploads
function add_upload_mimes( $types ) {
	$types['json'] = 'text/plain';
	return $types;
}
add_filter( 'upload_mimes', 'add_upload_mimes' );

// Allow SVG Uploads
add_filter( 'wp_check_filetype_and_ext', function($data, $file, $filename, $mimes) {

  global $wp_version;
  if ( $wp_version !== '4.7.1' ) {
     return $data;
  }

  $filetype = wp_check_filetype( $filename, $mimes );

  return [
      'ext'             => $filetype['ext'],
      'type'            => $filetype['type'],
      'proper_filename' => $data['proper_filename']
  ];

}, 10, 4 );

function fk_ventures_mime_types( $mimes ){
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter( 'upload_mimes', 'fk_ventures_mime_types' );

function fix_svg() {
  echo '<style type="text/css">
        .attachment-266x266, .thumbnail img {
             width: 100% !important;
             height: auto !important;
        }
        </style>';
}
add_action( 'admin_head', 'fix_svg' );

// Max Upload Size
@ini_set( 'upload_max_size' , '256M' );
@ini_set( 'post_max_size', '256M');
@ini_set( 'max_execution_time', '300' );

add_filter( 'template_include', 'change_page_template_call', 50 );
function change_page_template_call( $template )
{
    if( isset( $_GET['template'] ) && 'republish' == $_GET['template'] )
    {
        $new_template = locate_template( array( 'single-republish.php' ) );
        if ( !empty( $new_template ) )
        {
            return $new_template;
        }
    }
    return $template;
}

// Stop Auto Redirects
remove_action('template_redirect', 'redirect_canonical');

// Stop Block Directory
remove_action( 'enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets' );

// Remove CSS from Gravity Forms
// add_filter( 'gform_disable_css', '__return_true' );

add_filter( 'gform_default_styles', function( $styles ) {
  return '{
  "theme":"",
  "inputSize":"lg",
  "inputBorderRadius":"4",
  "inputBorderColor":"#53585f",
  "inputBackgroundColor":"#ffffff",
  "inputColor":"#212121",
  "inputPrimaryColor":"#ffd95a",
  "labelColor":"#ffffff",
  "descriptionColor":"#dcdee0",
  "buttonPrimaryBackgroundColor":"#ffd95a",
  "buttonPrimaryColor":"#212121"
  }';
} );


// Gutenberg Editor Styles
add_theme_support('editor-styles');
add_editor_style(get_template_directory_uri() . '/assets/editor.min.css');
