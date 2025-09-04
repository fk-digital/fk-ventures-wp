<?php

  add_action( 'init', 'disable_emojis' );

  // Disable Emoji
  function disable_emojis() {
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
    add_filter( 'wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2 );
  }

  // Disable Emoji Tiny MCE
  function disable_emojis_tinymce( $plugins ) {
    if ( is_array( $plugins ) ) {
    return array_diff( $plugins, array( 'wpemoji' ) );
    } else {
    return array();
    }
  }

  // Disable Emoji DNS Prefetch
  function disable_emojis_remove_dns_prefetch( $urls, $relation_type ) {
    if ( 'dns-prefetch' == $relation_type ) {
    /** This filter is documented in wp-includes/formatting.php */
    $emoji_svg_url = apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' );

    $urls = array_diff( $urls, array( $emoji_svg_url ) );
    }
    return $urls;
  }

  // Remove Header CSS Bump
  function remove_admin_login_header() {
    // remove_action('wp_head', '_admin_bar_bump_cb');
  }
  add_action( 'get_header', 'remove_admin_login_header' );

  //Remove JQuery migrate
  function remove_jquery_migrate( $scripts ) {
    if ( ! is_admin() && isset( $scripts->registered['jquery'] ) ) {
      $script = $scripts->registered['jquery'];
      if ( $script->deps ) { // Check whether the script has any dependencies
        $script->deps = array_diff( $script->deps, array( 'jquery-migrate' ) );
      }
    }
  }
  add_action( 'wp_default_scripts', 'remove_jquery_migrate' );

  // Add Defer to JS Scripts
  function fk_ventures_defer_scripts( $tag, $handle, $src ) {
    $defer = array( 'fk_ventures-js');
    if ( in_array( $handle, $defer ) ) {
      return '<script src="' . $src . '" defer="defer" type="text/javascript"></script>' . "\n";
    }
    return $tag;
  }
  add_filter( 'script_loader_tag', 'fk_ventures_defer_scripts', 10, 3 );
