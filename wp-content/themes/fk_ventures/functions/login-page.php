<?php

function fk_ventures_logo_url() {
  return home_url();
}
add_filter( 'login_headerurl', 'fk_ventures_logo_url' );

function fk_ventures_logo_url_title() {
  return 'FK Ventures';
}
add_filter( 'login_headertext', 'fk_ventures_logo_url_title' );

// Use site logo/wordmark for login page
function fk_ventures_custom_login_logo() {
  if ( file_exists( get_stylesheet_directory() . '/assets/images/logo.svg') ) :
    $logo = '/logo.svg';
  endif; ?>
  <style type="text/css">
    #login h1 a,
    .login h1 a {
      background-image: url(<?php echo get_stylesheet_directory_uri() . '/assets/images' . $logo; ?>);
      width:437px;
      height:54px;
      background-size:437px 54px;
      background-repeat: no-repeat;
      padding: 0;
      margin: 0 0 40px -58.5px;
    }
  </style>
<?php }


add_action( 'login_enqueue_scripts', 'fk_ventures_custom_login_logo' );
