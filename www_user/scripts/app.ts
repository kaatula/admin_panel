﻿declare var $: any;
declare var DevExpress: any;

class Gpio {
    constructor(public id: number, public title: string, public inverse: boolean = false) {
    }
}

var redLed = new Gpio(74, "Red onboard LED"),
    favoriteGpio = new Gpio(79, "Outer LED");


function createSwitch($container: any, gpio: Gpio) {

    var $switchContainer = $("<div/>", { "class": "gpio-indicator" }).appendTo($container),
        $title = $("<h4/>").html(gpio.title + " <small>(" + gpio.id + ")</small>" + (gpio.inverse ? " <i>инв.</i>" : "")).appendTo($switchContainer),
        $gaugeContainer = $("<div/>", { "class": "gpio-gauge", }).appendTo($switchContainer),
        $switchContainer = $("<div/>", { "class": "gpio-switch" }).appendTo($switchContainer);


    var gauge = $gaugeContainer.dxCircularGauge({
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
        value: 0,
        valueIndicator: {
            type: 'triangleNeedle',
            color: '#FC510D'
        }
    }).dxCircularGauge("instance");

    $switchContainer.dxSwitch({
        onText: "ВКЛ",
        offText: "ВЫКЛ",
        onValueChanged: function (p) {
            if (gpio.inverse) {
                p.value = !p.value;
                p.previousValue = !p.previousValue;
            }

            var v = p.value ? "1" : "0";
            gauge.option("value", 50);

            $.get("api/setgpio.php", {
                num: gpio.id,
                dir: "output",
                val: v
            }).then(function success() {
                    gauge.option("value", p.value ? 100 : 0);
                }, function fail(err, _, descr) {
                    gauge.option("value", p.previousValue ? 100 : 0);
                    console.log(arguments);
                    DevExpress.ui.notify("Network problem: " + descr, "error", 3000);

                });

        }
    });
}


$.ajaxSetup({
    // Disable caching of AJAX responses
    cache: false
});

$(document).ready(function () {
    var $container = $("#gpioSwitches");
    createSwitch($container, redLed);
    createSwitch($container, favoriteGpio);  
    createSwitch($container, new Gpio(86, "Лампочка 220 V", true));  
    


});

