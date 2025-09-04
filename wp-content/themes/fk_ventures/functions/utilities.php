<?php
/**
 * Utility Functions for FK Ventures Theme
 *
 * Contains helper functions for file versioning, file size conversion, and other utilities
 */

class FK_Utilities {

  /**
   * Convert bytes to human readable format
   *
   * @param int $bytes Number of bytes
   * @param int $dec Number of decimal places
   * @return string Formatted file size
   */
  public function FileSizeConvert($bytes, $dec = 2) {
    $size   = array(' B', ' kB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB');
    $factor = floor((strlen($bytes) - 1) / 3);
    return sprintf("%.{$dec}f", $bytes / pow(1024, $factor)) . @$size[$factor];
  }

  /**
   * Get file version based on file modification time
   *
   * @param string $file_path Path to the file
   * @return string Version string
   */
  public function get_file_version($file_path) {
    return get_bloginfo('version') . '.' . filemtime($file_path);
  }

  /**
   * Get CSS file version for cache busting
   *
   * @return string CSS version string
   */
  public function get_app_css_version() {
    $app_css_path = get_stylesheet_directory() . '/assets/style.min.css';
    return $this->get_file_version($app_css_path);
  }

  /**
   * Get JavaScript file version for cache busting
   *
   * @return string JavaScript version string
   */
  public function get_app_js_version() {
    $app_js_path = get_stylesheet_directory() . '/assets/scripts.min.js';
    return $this->get_file_version($app_js_path);
  }
}

// Initialize the utilities class and make it globally available
global $fk_utilities;
$fk_utilities = new FK_Utilities();
