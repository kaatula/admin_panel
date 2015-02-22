declare var $: any;
declare var DevExpress: any;

class Gpio {
    constructor(public id: number, public title: string) {
    }
}

var redLed = new Gpio(74, "Red onboard LED"),
    favoriteGpio = new Gpio(79, "Outer LED");


function createSwitch($container: any, gpio: Gpio) {

    var $switchContainer = $("<div/>", { "class": "gpio-indicator" }).appendTo($container),
        $title = $("<h4/>").text(gpio.title + " (" + gpio.id + ")").appendTo($switchContainer),
        $gaugeContainer = $("<div/>", { "class": "gpio-gauge", }).appendTo($switchContainer),
        $switchContainer = $("<div/>", { "class": "gpio-switch" }).appendTo($switchContainer);


    var gauge = $gaugeContainer.dxCircularGauge($.extend(true, {
        geometry: {
            startAngle: 180, endAngle: 0
        },
        scale: {
            startValue: 0, endValue: 100,
            majorTick: {
                tickInterval: 100
            }
        }
    }, {
            value: 0,
            valueIndicator: {
                type: 'triangleNeedle',
                color: '#FC510D'
            }
        })).dxCircularGauge("instance");

    $switchContainer.dxSwitch({
        onText: "ВКЛ",
        offText: "ВЫКЛ",
        onValueChanged: function (p) {
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


$(document).ready(function () {
    var $container = $("#gpioSwitches");
    createSwitch($container, redLed);
    createSwitch($container, favoriteGpio);  
    createSwitch($container, new Gpio(86, "Соседний разъем"));  
    


});

