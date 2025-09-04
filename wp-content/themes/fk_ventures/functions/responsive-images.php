<?php
/**
 * Responsive Image Functions for FK Ventures Theme
 *
 * Handles srcset generation, caching, and cache management for responsive images
 */

class FK_Responsive_Images {

  /**
   * Generate image srcset and sizes for responsive images
   *
   * @param int $image_id WordPress attachment ID
   * @param array $custom_sizes Array of custom image sizes to include
   * @return array|false Image data array or false if image not found
   */
  public function generate_image_srcset($image_id, $custom_sizes = array()) {
    if (!$image_id) {
      return false;
    }

    // Create cache key
    $cache_key = 'image_srcset_' . $image_id . '_' . md5(serialize($custom_sizes));

    // Try to get from cache first
    $cached_data = get_transient($cache_key);
    if ($cached_data !== false) {
      return $cached_data;
    }

    $image = wp_get_attachment_image_src($image_id, 'full');
    if (!$image) {
      return false;
    }

    $srcset = array();
    $sizes = array();

    // Get all available image sizes
    $available_sizes = get_intermediate_image_sizes();

    // Add custom sizes if provided
    if (!empty($custom_sizes)) {
      $available_sizes = array_merge($available_sizes, $custom_sizes);
    }

    // Generate srcset for each size
    foreach ($available_sizes as $size) {
      $img_data = wp_get_attachment_image_src($image_id, $size);
      if ($img_data) {
        $srcset[] = $img_data[0] . ' ' . $img_data[1] . 'w';

        // Build sizes attribute
        if ($img_data[1] <= 768) {
          $sizes[] = '(max-width: 768px) ' . $img_data[1] . 'px';
        } elseif ($img_data[1] <= 1024) {
          $sizes[] = '(max-width: 1024px) ' . $img_data[1] . 'px';
        } else {
          $sizes[] = $img_data[1] . 'px';
        }
      }
    }

    // Add full size
    $srcset[] = $image[0] . ' ' . $image[1] . 'w';
    $sizes[] = $image[1] . 'px';

    $result = array(
      'src' => $image[0],
      'srcset' => implode(', ', $srcset),
      'sizes' => implode(', ', $sizes),
      'width' => $image[1],
      'height' => $image[2],
      'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true),
      'title' => get_the_title($image_id),
      'caption' => wp_get_attachment_caption($image_id)
    );

    // Cache for 24 hours (86400 seconds)
    set_transient($cache_key, $result, 86400);

    return $result;
  }

  /**
   * Clear image cache when attachments are updated
   *
   * @param int $attachment_id WordPress attachment ID
   * @param array $attachment_metadata Attachment metadata
   */
  public function clear_image_cache($attachment_id, $attachment_metadata) {
    // Clear all cached srcset data for this image
    global $wpdb;
    $wpdb->query(
      $wpdb->prepare(
        "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
        '_transient_image_srcset_' . $attachment_id . '_%'
      )
    );
  }

  /**
   * Check if image cache is working (for debugging)
   *
   * @param int $image_id WordPress attachment ID
   * @return array Cache status information
   */
  public function check_image_cache_status($image_id) {
    $cache_key = 'image_srcset_' . $image_id . '_' . md5(serialize(array()));
    $cached = get_transient($cache_key);
    return array(
      'has_cache' => $cached !== false,
      'cache_key' => $cache_key,
      'cached_data' => $cached
    );
  }

  /**
   * Add Twig functions for responsive images
   *
   * @param Twig\Environment $twig Twig environment instance
   * @param FK_Responsive_Images $responsive_images Responsive images instance
   */
  public function add_twig_functions($twig, $responsive_images) {
    // Generate Image Srcset
    $twig->addFunction(new \Twig\TwigFunction('generateImageSrcset', function ($image_id, $custom_sizes = array()) use ($responsive_images) {
      return $responsive_images->generate_image_srcset($image_id, $custom_sizes);
    } ) );

    // Simple Responsive Image Function
    $twig->addFunction(new \Twig\TwigFunction('responsiveImage', function ($image_id, $class = '', $lazy = true, $custom_sizes = array()) use ($responsive_images) {
      $image_data = $responsive_images->generate_image_srcset($image_id, $custom_sizes);

      if (!$image_data) {
        return '';
      }

      $html = '<img src="' . esc_attr($image_data['src']) . '"';
      $html .= ' srcset="' . esc_attr($image_data['srcset']) . '"';
      $html .= ' sizes="' . esc_attr($image_data['sizes']) . '"';
      $html .= ' width="' . esc_attr($image_data['width']) . '"';
      $html .= ' height="' . esc_attr($image_data['height']) . '"';
      $html .= ' alt="' . esc_attr($image_data['alt']) . '"';
      $html .= ' title="' . esc_attr($image_data['title']) . '"';
      $html .= ' loading="' . ($lazy ? 'lazy' : 'eager') . '"';

      if ($class) {
        $html .= ' class="' . esc_attr($class) . '"';
      }

      $html .= ' />';

      return $html;
    } ) );
  }
}

// Initialize the responsive images class and make it globally available
global $fk_responsive_images;
$fk_responsive_images = new FK_Responsive_Images();
