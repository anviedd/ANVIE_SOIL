<?php
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'rel_canonical');
global $global_uri;
$global_uri = get_template_directory_uri();
add_theme_support('post-thumbnails');
function load_google_cdn()
{
    if (!is_admin()) {
        //  wp_deregister_script('jquery');
        wp_enqueue_script('index', get_template_directory_uri() . '/assets/js/main.js', array(), null, true);
    }
}
add_action('init', 'load_google_cdn');
function create_post_type()
{ };