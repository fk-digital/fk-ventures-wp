<?php
/**
 * Search results page
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$templates = array( 'search.twig' );

$earchQuery = get_search_query();

$context = Timber::context();

$context['searchQuery'] = $earchQuery;


Timber::render( $templates, $context );
