<?php
/*****************************************************
* modules/network/saveinterfaces.php
* network interfaces save file
*(c)virt2real.ru 2013
* draft, by Gol
/*****************************************************/

// common include
include('../../parts/global.php');

if (!isset($_POST['nslist']) || !isset($_POST['ifacelist'])) die;

$ifacefilename = '/etc/network/interfaces';
$ifacelist = $_POST['ifacelist'];

$fullifacelist = "# Autogenerated file, DO NOT EDIT!\n# If edited, network settings in admin panel may not work properly\n\n";
$fullifacelist .= "auto lo\niface lo inet loopback\n\n";
$fullifacelist .= $ifacelist;

file_put_contents($ifacefilename, $fullifacelist);

$nsfilename = '/etc/resolv.conf';
$nslist = $_POST['nslist'];

$fullnslist = "# Autogenerated file, DO NOT EDIT!\n# If edited, network settings in admin panel may not work properly\n\n";
$fullnslist .= $nslist;

file_put_contents($nsfilename, $fullnslist);

?>
