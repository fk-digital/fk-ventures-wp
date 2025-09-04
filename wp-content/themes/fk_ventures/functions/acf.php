<?php

add_action('acf/init', 'fk_ventures_acf_init');

function fk_ventures_acf_init() {
  // Admin-only ACF settings
  if (is_admin()) {
    add_filter('acf/fields/wysiwyg/toolbars' , 'fk_ventures_toolbars'  );
    add_action('tiny_mce_before_init', 'custom_toolbars_settings', 10, 2);
    add_action('tiny_mce_before_init', 'fk_ventures_formats');

  }

  // Removes option for a h1 heading in all ACF wysiwyg editors
  function custom_toolbars_settings($mceInit, $editor_id) {
    if ('acf_content' == $editor_id) {
      $mceInit['block_formats'] = 'Paragraph=p;' . 'Heading 2=h2;' . 'Heading 3=h3;' . 'Heading 4=h4;';
    }
    return $mceInit;
  }

  function fk_ventures_formats( $init_array ) {
    // Define the style_formats array
    $style_formats = array(
      // Each array child is a format with it's own settings
      array(
        'title' => 'Paragraph - Large',
        'inline' => 'span',
        'classes' => 'p--large',
        'wrapper' => false,
      ),
      array(
        'title' => 'Paragraph - Small',
        'inline' => 'span',
        'classes' => 'p--small',
        'wrapper' => false,
      ),
    );
    // Insert the array, JSON ENCODED, into 'style_formats'
    $init_array['style_formats'] = wp_json_encode( $style_formats );

    return $init_array;

  }

  function fk_ventures_toolbars( $toolbars ) {
    $toolbars['Future Kings Options' ] = array();
    $toolbars['Future Kings Options' ][1] = array('formatselect', 'styleselect', 'bold' , 'italic' , 'underline', 'link', 'blockquote', 'bullist', 'numlist', 'alignleft', 'aligncenter', 'alignright', 'removeformat' );
    return $toolbars;
  }
}
