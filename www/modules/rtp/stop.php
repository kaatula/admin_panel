<?php

/*****************************************************
* modules/rtp/stop.php
* rtp stop command file
*(c)virt2real.ru 2013
* draft, by Gol
/*****************************************************/

// common include
include('../../parts/global.php');
require_once('../../parts/language.php');
lang_swapmod('rtp');

shell_exec("/etc/virt2real/rtp_server.sh stop");

echo $language['M_RTP_STREAM_STOPPED'];

?>
