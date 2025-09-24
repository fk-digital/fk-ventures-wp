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
$templates = array('single-case-study.twig', 'single.twig');

if (post_password_required($post->ID)) {
	$templates = 'single-password.twig';
}

Timber::render($templates, $context);
