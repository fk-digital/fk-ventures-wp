<?php

/*
* General Admin area modifications
*/


// Remove Menu Links
add_action( 'admin_menu', 'fk_ventures_remove_admin_menus' );
function fk_ventures_remove_admin_menus() {
    remove_menu_page( 'edit-comments.php' );
}

// Removes comments from post and pages
add_action('init', 'remove_comment_support', 100);
function remove_comment_support() {
    remove_post_type_support( 'post', 'comments' );
    remove_post_type_support( 'page', 'comments' );
}

// Removes comments from admin bar
add_action( 'wp_before_admin_bar_render', 'fk_ventures_admin_bar_render' );
function fk_ventures_admin_bar_render() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
}

// Remove Gutenberg
add_filter('use_block_editor_for_post_type', 'fk_ventures_disable_gutenberg', 10, 2);
function fk_ventures_disable_gutenberg($current_status, $post_type)
{
    // Use your post type key instead of 'product'
    if ($post_type === 'team' || $post_type === 'location' || $post_type === 'product' || $post_type === 'product-feature' ||  $post_type === 'badge-row') return false;
    return $current_status;
}

// Move Yoast to bottom
function yoasttobottom() {
	return 'low';
}
add_filter( 'wpseo_metabox_prio', 'yoasttobottom');
