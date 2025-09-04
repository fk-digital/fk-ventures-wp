<?php

/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 */

namespace App;

use Timber\Timber;

$context = Timber::context();

$templates = array( 'archive.twig', 'index.twig' );

$subtitle = '';
$title = 'Archive';
$desc = '';
$catID = '';

if (is_day()) {
  $subtitle = 'Day: ';
	$title = get_the_date('D M Y');
} elseif (is_month()) {
  $subtitle = 'Month: ';
	$title = get_the_date('M Y');
} elseif (is_year()) {
  $subtitle = 'Year: ';
	$title = get_the_date('Y');
} elseif (is_tag()) {
  $subtitle = 'Tag: ';
	$title = single_tag_title('', false);
} elseif (is_category()) {
  $subtitle = 'Category: ';
	$title = single_cat_title('', false);
  $category = get_category( get_query_var( 'cat' ) );
  $catID = $category->cat_ID;
} elseif (is_tax( 'service' )) {
  $subtitle = 'Service: ';
	$title = single_term_title('', false);
} elseif (is_post_type_archive()) {
  $subtitle = 'Posts from: ';
	$title = post_type_archive_title('', false);
}

if (is_post_type_archive('case-study')) {
	array_unshift($templates, 'archive-case-study.twig');
  $args = array(
    'post_type' => 'case-study',
    'order'       => 'ASC',
    'orderby'     => 'menu_order',
    'posts_per_page' => -1,
  );
  $context['posts'] = Timber::get_posts($args);
}


$context['title'] = $title;
$context['subtitle'] = $subtitle;
$context['desc'] = $desc;
if (is_category()) {
  $context['catID'] = $catID;
}


Timber::render($templates, $context);
