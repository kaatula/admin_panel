<?php

/*****************************************************
* modules/samples_de/setgpio.php
* set GPIO state
* (c)virt2real.ru 2013-2014
* draft, by Gol, Realizator, keios
/*****************************************************/

// common include
include('../../parts/global.php');

if (!isset($_GET['dir']) || !isset($_GET['val']) || !isset($_GET['num'])) die;

$dir = $_GET['dir'];
$val = intval($_GET['val']);


$num = $_GET['num'];
$list = explode(",", $num);

foreach ($list as $k=>$v) {

	if (!$v) continue;

	$cmd = "set gpio $v $dir $val";
	file_put_contents("/dev/v2r_gpio", $cmd);
	echo 'GPIO Nummer '.$num.' wurde auf die Werte \''.$dir.'\' und '.$val.' gesetzt.';

}

?>
