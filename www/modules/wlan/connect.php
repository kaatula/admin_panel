<?php

/*****************************************************
* modules/wlan/connect.php
* wlan connect/disconnect
* (c)virt2real.ru 2014
* draft, by Gol
/*****************************************************/

// common include
include('../../parts/global.php');

if (!isset($_POST['iface']) || !isset($_POST['state'])) die ();

switch ($_POST['state']) {
	case 1:
		shell_exec('ifup -f '.$_POST['iface']);
		break;
	case 0:
		shell_exec('ifdown -f '.$_POST['iface']);
		break;
}
          


?>