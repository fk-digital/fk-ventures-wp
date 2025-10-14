<?php

/**
 * Render ACF Blocks
 */
function future_kings_acf_block_render_callback($block, $content = '', $is_preview = true) {
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

  // People
  if ($block['name'] == "acf/people") {
    $context['team'] = Timber::get_posts(['post_type' => 'person', 'orderby' => 'menu_order','order' => 'ASC',]);
  }


  // Latest Articles
  if ($block['name'] == "acf/latest-articles") {
    $context['latestArticles'] = Timber::get_posts(['post_type' => 'post', 'posts_per_page' => 2, ]);
  }


  // Work Service
  if ($block['name'] == "acf/work-service") {

    $service = get_field("service");

    $cpQuery = new WP_Query([
        'post_type' => array('animation', 'video'),
        'posts_per_page' => - 1,
        'tax_query' => array(
          array(
            'taxonomy' => 'service',
            'field' => 'id',
            'terms' => $service,
          ),
        ),
    ]);

    $attatchmentQuery = new WP_Query([
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'post_status'    => 'inherit',
        'posts_per_page' => - 1,
        'tax_query' => array(
          array(
            'taxonomy' => 'service',
            'field' => 'id',
            'terms' => $service,
          ),
        ),
    ]);

    $finalWorksQuery = new WP_Query();
    $finalWorksQuery->posts = array_merge( $cpQuery->posts, $attatchmentQuery->posts );

    $works = array();
    foreach ( $finalWorksQuery->posts as $work ) {
        $works[] = $work;
    }

    function shuffle_assoc(&$array) {
      $keys = array_keys($array);
      shuffle($keys);
      foreach($keys as $key) {
          $new[$key] = $array[$key];
      }
      $array = $new;
      return $array;
    }

    $context['works'] = shuffle_assoc($works);

  }

  // Case Studies List
  if ($block['name'] == "acf/case-studies-list") {

    // sector : Sector
    // service : Service
    // brand : Brand Program
    // choice : Choice


    $type = get_field("type");
    if ($type == "sector") {
      $caseStudiesListArgs = array(
        'post_type'   => 'work',
        'posts_per_page' => -1,
        'tax_query' => array(
            array(
                'taxonomy' => 'sector',
                'field'    => 'id',
                'terms'    => get_field("sector"),
            ),
        ),
      );
    } elseif ($type == "service") {
      $caseStudiesListArgs = array(
        'post_type'   => 'work',
        'posts_per_page' => -1,
        'tax_query' => array(
            array(
                'taxonomy' => 'service',
                'field'    => 'id',
                'terms'    => get_field("service"),
            ),
        ),
      );
    } elseif ($type == "choice") {
      $caseStudiesListArgs = array(
        'post_type'   => 'work',
        'post__in' => get_field('choices')
      );
    } elseif ($type == "brand") {
      $caseStudiesListArgs = array(
        'post_type'   => 'work',
        'posts_per_page' => -1,
        'tax_query' => array(
            array(
                'taxonomy' => 'brand_program',
                'field'    => 'id',
                'terms'    => get_field("brand_program"),
            ),
        ),
      );


      // $selectedPosts = get_field("posts");
      // $articlesPosts = Timber::get_posts($selectedPosts);
    }

    $caseStudiesListPosts = Timber::get_posts($caseStudiesListArgs);
    $context['case_studies_list'] = $caseStudiesListPosts;
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
