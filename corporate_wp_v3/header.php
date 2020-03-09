<!DOCTYPE html>
<html lang="ja">
<?php
global $global_uri;
$dir_uri = get_stylesheet_directory_uri();
global $template;
$template_name = basename($template, '.php');
?>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="">
  <meta name=" Keywords" content="">
  <title><?php if (is_front_page()) : ?>タイトル<?php else : ?><?php wp_title(''); ?> | <?php bloginfo('name'); ?><?php endif; ?></title>
  <link rel=" icon" type="image/png" sizes="32x32" href="<?php echo $global_uri; ?>/assets/img/favicon.ico">

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.0.0/dist/css/yakuhanmp.min.css">

  <link href="<?php echo $global_uri; ?>/assets/css/main.css" rel="stylesheet" media="all" type="text/css">
  <meta property="og:title" content="<?php if (is_front_page()) : ?>タイトル<?php else : ?><?php wp_title(''); ?> | <?php bloginfo('name'); ?><?php endif; ?>">
  <meta property="og:description" content="">
  <meta property="og:type" content="website">
  <meta property="og:url" content="">
  <meta property="og:image" content="">
  <meta property="og:site_name" content="">
  <meta property="og:locale" content="ja_JP">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="#">

  <?php
  wp_dequeue_style('jetpack-top-posts-widget');
  if (has_action('wp_head', '_admin_bar_bump_cb')) remove_action('wp_head', '_admin_bar_bump_cb');
  wp_head();
  ?>
</head>

<body>
  <div class="l-page" data-page-id="<?php echo $template_name; ?>">