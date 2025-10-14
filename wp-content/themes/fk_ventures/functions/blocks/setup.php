<?php
// Add Custom Category for ACF Blocks
function future_kings_block_categories($categories, $post) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'future-kings-blocks',
				'title' => 'Future Kings Blocks',
				'icon'  => 'wordpress',
			),
		)
	);
}
add_filter('block_categories_all', 'future_kings_block_categories', 10, 2);


// function future_kings_blacklist_blocks( $allowed_blocks, $editor_context ) {

//   if( get_option( 'page_on_front' ) == $_GET['post']) {
//     $allowed_blocks = array(
//       'acf/page-header',
//       'acf/people',
//     );
// 	} else {
//     $blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
//     unset( $blocks[ 'acf/page-header' ] );
//     unset( $blocks[ 'acf/people' ] );
//     $allowed_blocks = array_keys( $blocks );
//   }

// 	return $allowed_blocks;
// }

// add_filter( 'allowed_block_types_all', 'future_kings_blacklist_blocks', 25, 2  );


// Set allowed block types on pages/posts/CPTs
function future_kings_allowed_block_types($allowed_blocks, $editor_context) {

	if ($editor_context->post->post_type === 'post') {
		$allowed_blocks = array(
      'core/audio',
      'core/button',
      'core/code',
      'core/coverImage',
      'core/embed',
      'core/file',
      'core/freeform',
      'core/gallery',
      'core/heading',
      'core/html',
      'core/image',
      'core/list',
      'core/paragraph',
      'core/preformatted',
      'core/pullquote',
      'core/quote',
      'core/shortcode',
      'core/subhead',
      'core/table',
      'core/video',
      'acf/case-study-single',
		);
   } elseif ($editor_context->post->post_type === 'work') {
		$allowed_blocks = array(
      'acf/text-columns',
      'acf/text',
      'acf/media-row',
      'acf/asymmetric-media-row',
      'acf/carousel',
      'acf/cta',
      'acf/colour',
      'acf/switch',
      'acf/parallax-three-col',
      'acf/parallax-laptop',
      'acf/parallax-phone',
      'acf/horizontal-scroll',
      'acf/marquee',
      'acf/before-after',
      'acf/framed-media'
    );
	} else {
		$allowed_blocks = array(
      'acf/sidebar',
		);
	}

	return $allowed_blocks;
}
add_filter('allowed_block_types_all', 'future_kings_allowed_block_types', 10, 2);
