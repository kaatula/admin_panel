<?php

/*****************************************************
* modules/usbmediadevices/description.php
* module description file
* (c)virt2real.ru 2015
* draft, by Gol
/*****************************************************/

$module_params['name'] = 'usbmediadevices';
$module_params['title'] = '%M_DESC%';
$module_params['menu_part'] = 7;
$module_params['position'] = 3;
$module_params['depend'] = array("gphoto2", "mountptp.sh", "umountptp.sh");
$module_params['depend_descr'] = array("GPhoto2", "GPhoto2fs");
?>
