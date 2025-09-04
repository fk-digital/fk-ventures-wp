<?php
// Add Custom Category for ACF Blocks
function fk_ventures_block_categories($categories, $post) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'fk_ventures-blocks',
				'title' => 'FK Ventures Blocks',
				'icon'  => 'wordpress',
			),
		)
	);
}
add_filter('block_categories_all', 'fk_ventures_block_categories', 10, 2);

// Set allowed block types on pages/posts/CPTs
function fk_ventures_allowed_block_types($allowed_blocks, $editor_context) {

	if ($editor_context->post->post_type === 'post') {
		$allowed_blocks = array(
      'core/audio',
      'core/buttons',
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
      'core/columns',
      'core/column'
		);
	} else {
		$allowed_blocks = array(
      'acf/home-hero',
      'acf/hero',
      'acf/media-card-panel',
      'acf/media-card-carousel',
      'acf/icon-card-panel',
      'acf/content-panel',
      'acf/stats-panel',
      'acf/badges',
      'acf/gallery',
      'acf/cta',
      'acf/steps',
      'acf/articles',
      'acf/form',
      'acf/team',
      'acf/buttons',
      'acf/text',
      'acf/media',
      'acf/media-carousel',
      'acf/html',
      'acf/downloads',
      'acf/accordion',
      'acf/tabs',
      'acf/sidebar',
      'acf/results',
      'acf/case-studies',
      'acf/how-it-works'
		);
	}

	return $allowed_blocks;
}
add_filter('allowed_block_types_all', 'fk_ventures_allowed_block_types', 10, 2);
