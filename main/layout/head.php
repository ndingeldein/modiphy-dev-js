<!DOCTYPE html>
<html class="no-js">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?php readfile('../' . $config['sources_path'] . 'metadata_website_title.html'); ?></title>

  <meta name="robots" content="all" />
  <meta name="description" content="<?php readfile('../' . $config['sources_path'] . 'metadata_description.html'); ?>" />
  <meta name="keywords" content="<?php readfile('../' . $config['sources_path'] . 'metadata_keywords.html'); ?>" />

  <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">

  <?php

    if($config['isMobile']){

      echo <<<EOT

      <meta name="HandheldFriendly" content="True">
      <meta name="MobileOptimized" content="320">      
      <meta http-equiv="cleartype" content="on">

EOT;

      $mobile_class = 'mobile';

    }else{
      $mobile_class = 'no-mobile';
    }

  ?>

  <?php include('./layout/og.php') ?>
  <?php include('./layout/base_href.php') ?>  
  <?php include('./layout/assets.php'); ?>

</head>

<body ontouchstart="" class="<?php echo $mobile_class ?>">

<!-- Facebook SDK -->
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '769976326359069',
      xfbml      : true,
      version    : 'v2.0'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>