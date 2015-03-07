/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/devextreme/dx.devextreme.d.ts" />
/// <reference path="typings/swfobject/swfobject.d.ts" />

class Gpio {
    constructor(public id: number, public title: string, public inverse: boolean = false) {
    }

    public value: boolean;

    get controlValue(): boolean {
        if (this.inverse) return !this.value;
        return this.value;
    }

    set controlValue(value: boolean) {
        if (this.inverse) {
            this.value = !value;
        } else {
            this.value = value;
        }
    }
}


interface GpioService {
    getValue(id: number): JQueryPromise<any>;
    setValue(id: number, value: boolean): JQueryPromise<any>;
}


var redLed = new Gpio(74, "Red onboard LED"),
    favoriteGpio = new Gpio(79, "Outer LED");


function createSwitch($container: any, gpio: Gpio) {

    var $switchContainer = $("<div/>", { "class": "gpio-indicator" }).appendTo($container),
        $title = $("<h4/>").html(gpio.title + " <small>(" + gpio.id + ")</small>" + (gpio.inverse ? " <i>инв.</i>" : "")).appendTo($switchContainer),
        $gaugeContainer = $("<div/>", { "class": "gpio-gauge", }).appendTo($switchContainer),
        $loadingContainer = $("<div/>", { "class": "gpio-loading" }).appendTo($gaugeContainer),
        $switchContainer = $("<div/>", { "class": "gpio-switch" }).appendTo($switchContainer);



    var indicator = <DevExpress.ui.dxLoadIndicator><any>$loadingContainer.dxLoadIndicator({
            visible: false        
        }).dxLoadIndicator("instance");

    var updateWidgetsValues = function (gpio: Gpio) {
        var v = gpio.controlValue;

        gauge.option("value", v ? 100 : 0);
        switchWidget.option("value", v);
    }

    //var switchGpioOutputValue = function (gpio: Gpio, value: boolean) : JQueryPromise<any> {
    //}

    var gauge = <DevExpress.viz.gauges.dxCircularGauge><any>$gaugeContainer.dxCircularGauge({
        geometry: {
            startAngle: 180, endAngle: 0
        },
        scale: {
            startValue: 0, endValue: 100,
            majorTick: {
                tickInterval: 100
            }
        },
        rangeContainer: {
            ranges: [
                { startValue: 80, endValue: 100, color: '#FC510D' }
            ]
        },
        valueIndicator: {
            type: 'triangleNeedle',
            color: '#FC510D'
        }
    }).dxCircularGauge("instance");

    var switchWidget = <DevExpress.ui.dxSwitch><any>$switchContainer.dxSwitch({
        onText: "ВКЛ",
        offText: "ВЫКЛ",
        onValueChanged: function (p) {
            gpio.controlValue = p.value;
            gauge.option("value", 50);

            indicator.option("visible", true);
            //switchGpioOutputValue(gpio, p.value)

            $.get("api/setgpio.php", {
                num: gpio.id,
                dir: "output",
                val: gpio.value ? "1" : "0"
            }).then(function success() {
                updateWidgetsValues(gpio);
                indicator.option("visible", false);
            }, function fail(err, _, descr) {
                gpio.controlValue = p.previousValue;
                DevExpress.ui.notify("Network problem: " + descr, "error", 3000);
                indicator.option("visible", false);
            });

        }
    }).dxSwitch("instance");

    updateWidgetsValues(gpio);
}


$.ajaxSetup({
    // Disable caching of AJAX responses
    cache: false
});



var runRtmpBroadcast = function (hostname: string) {
    var swfVersionStr = "11.1.0";
    var xiSwfUrlStr = "playerProductInstall.swf";
    var flashvars : any = {};
    flashvars.host = "rtmp://" + hostname + "/live";
    flashvars.stream = "v2r";
    flashvars.width = 640;
    flashvars.height = 480;
    var params : any = {};
    params.quality = "high";
    params.bgcolor = "#000000";
    params.allowscriptaccess = "sameDomain";
    params.allowfullscreen = "true";
    var attributes : any = {};
    attributes.id = "rtmp_easy_viewer";
    attributes.name = "rtmp_easy_viewer";
    attributes.align = "middle";
    swfobject.embedSWF(
        "swf/rtmp_easy_viewer.swf", "flashContent",
        "640", "480",
        swfVersionStr, xiSwfUrlStr,
        flashvars, params, attributes);
    swfobject.createCSS("#flashContent", "display:block;text-align:left;");

    var broadcastLocation = "rtmp://" + hostname + "/live/v2r";
    var bitrate = "120000";
    var enablesound = 0;


    $.post("api/runRtmp.php", { bitrate: bitrate, enablesound: enablesound, broadcastLocation: broadcastLocation.valueOf() }, function (response, status, xhr) {
        if (status == "success") {
            DevExpress.ui.notify(response, "success", 3000);
        }
        if (status == "error") {
            DevExpress.ui.notify("Network problem: " + status, "error", 3000);
        }
    });
};



$(document).ready(function () {
    var $container = $("#gpioSwitches");

    var gpios = [
        redLed,
        favoriteGpio,
        new Gpio(86, "Лампочка 220 V", true)
    ];

    var hostname = window.location.hostname;

    //#IFDEBUG
    if (hostname === "localhost") {
        hostname = "192.168.3.1";
    }
    //
    runRtmpBroadcast(hostname);

    $.get("/api/get2.php").then(
        function success(result) {
            console.log(result);

            $.each(gpios, function (_, item) {
                item.value = result[item.id] === "1";
                createSwitch($container, item);
            });

        });
    


});

