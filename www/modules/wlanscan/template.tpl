<script>
	$(function() {
		$( "#accordion" ).accordion({ fillSpace: false, autoHeight: false, navigation: false, create: function( event, ui ) {init{module_name}();} });
	});

	function init{module_name}(){
		check_wlan();
		scan_wlan();
	}


	function check_wlan(){
		$.get("modules/{module_name}/check.php?" + Math.random(), function(response, status, xhr) {
			if (status == "success") {
				$("#wlanstate").html(response);
			}
		});
	}


	function scan_wlan(){
		$("#scan_result").html('<img src="/imgs/loader.gif">');
		$.get("modules/{module_name}/scan.php?" + Math.random(), function(response, status, xhr) {
			if (status == "success") {
				$("#scan_result").html(response);
			}
			if (status == "error") {
				$("#scan_result").html("%L_FAIL%");
			}
		});
	}

</script>

<div id="accordion" style="margin:0; padding:0;">

	<h3><a href="#">%M_WLAN_SCAN%</a></h3>
	<div>
		<p class="bluetitle">%M_CURRENT_STATUS%</a>  <a href="#" class="buttonlink" onclick='check_wlan(); return false;'>[ %M_UPDATE% ]</a>
		<div id="wlanstate"></div>

		<p class="bluetitle">%M_FOUND_PILE_OF_WLANS%</a>  <a href="#" class="buttonlink" onclick='check_wlan(); return false;'>[ %M_UPDATE% ]</a>

		<div id="scan_result" style="width: 90%;"></div>

	</div>


</div>

</div>
