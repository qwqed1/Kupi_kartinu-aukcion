<?php

if (!defined('ABSPATH')) {
    exit;
}

?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <main>
        <h1><?php bloginfo('name'); ?></h1>
        <p><?php esc_html_e('WordPress environment is ready.', 'auction-admin'); ?></p>
    </main>
    <?php wp_footer(); ?>
</body>
</html>

