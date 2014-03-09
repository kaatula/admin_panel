<div class="interfaceblock" name="{name}">
	<p><input type="checkbox" id="{name}_auto" {autochecked}> поднимать при старте</p>
	<div style="width:100px; float: left;">тип</div>
	<div style="float: left;">
		<select id="{name}_static" onchange='changeType("params_{name}",$(this).val());' style="height: 22px; line-height: 22px; width:150px; margin-bottom: 10px; color: #ffffff; border:1px solid #7c7c7c;">
		  <option value="static" {static_selected}>статический</option>
		  <option value="dhcp" {dhcp_selected}>dhcp</option>
		</select>
	</div>
</div>
<div style="float:both; clear: both;"></div>
<div class="params_{name} {hidden}">
	<div style="width:100px; float: left;">IP4 адрес</div>
	<div style="float: left;"><input type="text" id="{name}_address" value="{address}"></div>
</div>
<div style="float:both; clear: both;"></div>
<div class="params_{name} {hidden}">
	<div style="width:100px; float: left;">маска</div>
	<div style="float: left;"><input type="text" id="{name}_netmask" value="{netmask}"></div>
</div>
<div style="float:both; clear: both;"></div>
<div class="params_{name} {hidden}">
	<div style="width:100px; float: left;">шлюз</div>
	<div style="float: left;"><input type="text" id="{name}_gateway" value="{gateway}"></div>
</div>
<div style="float:both; clear: both;"></div>
<p><a href="#" onclick='ToggleExtended("{name}"); return false;'>расширенная настройка</a></p>
<div id="{name}_extended" style="display: none;">
<div>
	<div style="width:100px; float: left;">pre-up</div>
	<div style="float: left;"><input type="text" id="{name}_preup" value="{pre-up}"></div>
</div>
<div style="float:both; clear: both;"></div>
<div>
	<div style="width:100px; float: left;">up</div>
	<div style="float: left;"><input type="text" id="{name}_up"value="{up}"></div>
</div>
<div style="float:both; clear: both;"></div>
<div>
	<div style="width:100px; float: left;">post-up</div>
	<div style="float: left;"><input type="text" id="{name}_postup" value="{post-up}"></div>
</div>
<div style="float:both; clear: both;"></div>
<div>
	<div style="width:100px; float: left;">pre-down</div>
	<div style="float: left;"><input type="text" id="{name}_predown" value="{pre-down}"></div>
</div>
<div style="float:both; clear: both;"></div>
<div>
	<div style="width:100px; float: left;">down</div>
	<div style="float: left;"><input type="text" id="{name}_down" value="{down}"></div>
</div>
<div style="float:both; clear: both;"></div>
<div>
	<div style="width:100px; float: left;">post-down</div>
	<div style="float: left;"><input type="text" id="{name}_postdown" value="{post-down}"></div>
</div>
<div style="float:both; clear: both;"></div>
</div>

