<?php

/**
 * Render ACF Blocks
 */
function fk_ventures_acf_block_render_callback($block, $content = '', $is_preview = true) {
	$slug = str_replace('acf/', '', $block['name']);
	$blockName = str_replace("-"," ",$slug);
  $blockClass = ucwords($blockName);
  $className = str_replace(' ', '', $blockClass) . " Block Block--" . $slug;

  // Background Colour
  if (!empty($block['backgroundColor'])) {
		$className .= ' has-background ' . $block['backgroundColor'];
    $bgColor =  $block['backgroundColor'];
	}

  // Text Colour
	if (!empty($block['textColor'])) {
		$className .= ' has-text-color text-' . $block['textColor'];
    $textColor =  $block['textColor'];
	}

	if (!empty($block['align'])) {
		$className .= ' align-' . $block['align'];
	}
	if (!empty($block['className'])) {
		$className .= ' ' . $block['className'];
	}

	$context = Timber::context();
	$context['block'] = $block;
	$context['fields'] = get_fields();
	$context['is_preview'] = $is_preview;
	$context['class_names'] = $className;
  if (!empty($bgColor)) {
    $context['backgroundColorContext'] = $bgColor;
  } else {
    $context['backgroundColorContext'] = null;
  }
  if (!empty($textColor)) {
    $context['textColorContext'] = $textColor;
  } else {
    $context['textColorContext'] = null;
  }

  // Team
  if ($block['name'] == "acf/team") {
    $context['team'] = Timber::get_posts([
      'post_type' => 'team',
      'orderby' => 'menu_order',
      'order' => 'ASC',
      'hide_empty'     => 1,
      'depth'          => 1,
      'posts_per_page' => -1,
    ]);
  }


  // Articles
  if ($block['name'] == "acf/articles") {
    $type = get_field("type");
    if ($type == "latest") {
      $articlesPosts = Timber::get_posts(['post_type' => 'post', 'posts_per_page' => 4]);
    } elseif ($type == "cat") {
      $articlesPostsArgs = array(
        'post_type'   => 'post',
        'posts_per_page' => 4,
        'tax_query' => array(
            array(
                'taxonomy' => 'category',
                'field'    => 'id',
                'terms'    => get_field("category"),
            ),
        ),
      );
      $articlesPosts = Timber::get_posts($articlesPostsArgs);
    } elseif ($type == "selected") {
      $selectedPosts = get_field("posts");
      $articlesPosts = Timber::get_posts($selectedPosts);
    }
    $context['articles_posts'] = $articlesPosts;
  }


  // Render Template
  Timber::render('blocks/' . $slug . '.twig', $context);
}

// Add Post Content to Blocks
add_filter('timber/acf-gutenberg-blocks-data', function ($context) {
	$context['post'] = Timber::get_post();
	return $context;
});

// Add anchor attr to blocks
add_filter(
  'acf/pre_save_block',
  function( $attributes ) {
      if ( empty( $attributes['id'] ) ) {
          $attributes['id'] = 'acf-block-' . uniqid();
      }
      return $attributes;
  }
);
