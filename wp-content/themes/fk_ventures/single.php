<?php

/**
 * The Template for displaying all single posts
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

namespace App;

use Timber\Timber;

$context = Timber::context();

$post = $context['post'];
$postID = $post -> ID;
$templates = array('single-' . $post->post_type . '.twig', 'single.twig');


// Project Categories
$categories = $post->terms('category');
$categoryIds = array();
foreach($categories as $cat) {
 array_push($categoryIds, $cat->id );
}

// Case Study Categories
$csCategories = $post->terms('case-study-category');
$csCategoryIds = array();
foreach($csCategories as $csCat) {
 array_push($csCategoryIds, $csCat->id );
}

$context['related_posts'] = Timber::get_posts([
  'post_type' => 'post',
  'cat' => $categoryIds,
  'posts_per_page' => '4',
  'post__not_in' => [$postID],
]);

if (post_password_required($post->ID)) {
	$templates = 'single-password.twig';
}

Timber::render($templates, $context);