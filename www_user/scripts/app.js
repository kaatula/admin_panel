/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/devextreme/dx.devextreme.d.ts" />
var Gpio = (function () {
    function Gpio(id, title, inverse) {
        if (typeof inverse === "undefined") { inverse = false; }
        this.id = id;
        this.title = title;
        this.inverse = inverse;
    }
    Object.defineProperty(Gpio.prototype, "controlValue", {
        get: function () {
            if (this.inverse)
                return !this.value;
            return this.value;
        },
        set: function (value) {
            if (this.inverse) {
                this.value = !value;
            } else {
                this.value = value;
            }
        },
        enumerable: true,
        configurable: true
    });

    return Gpio;
})();

var redLed = new Gpio(74, "Red onboard LED"), favoriteGpio = new Gpio(79, "Outer LED");

function createSwitch($container, gpio) {
    var $switchContainer = $("<div/>", { "class": "gpio-indicator" }).appendTo($container), $title = $("<h4/>").html(gpio.title + " <small>(" + gpio.id + ")</small>" + (gpio.inverse ? " <i>инв.</i>" : "")).appendTo($switchContainer), $gaugeContainer = $("<div/>", { "class": "gpio-gauge" }).appendTo($switchContainer), $loadingContainer = $("<div/>", { "class": "gpio-loading" }).appendTo($gaugeContainer), $switchContainer = $("<div/>", { "class": "gpio-switch" }).appendTo($switchContainer);

    var indicator = $loadingContainer.dxLoadIndicator({
        visible: false
    }).dxLoadIndicator("instance");

    var updateWidgetsValues = function (gpio) {
        var v = gpio.controlValue;

        gauge.option("value", v ? 100 : 0);
        switchWidget.option("value", v);
    };

    //var switchGpioOutputValue = function (gpio: Gpio, value: boolean) : JQueryPromise<any> {
    //}
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
        valueIndicator: {
            type: 'triangleNeedle',
            color: '#FC510D'
        }
    }).dxCircularGauge("instance");

    var switchWidget = $switchContainer.dxSwitch({
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

$(document).ready(function () {
    var $container = $("#gpioSwitches");

    var gpios = [
        redLed,
        favoriteGpio,
        new Gpio(86, "Лампочка 220 V", true)
    ];

    $.get("/api/get2.php").then(function success(result) {
        console.log(result);

        $.each(gpios, function (_, item) {
            item.value = result[item.id] === "1";
            createSwitch($container, item);
        });
    });
});
