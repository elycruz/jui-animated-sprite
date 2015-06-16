/**
 * Created by Ely on 6/15/2015.
 */
$.widget('jui.juiAnimatedSprite', $.jui.juiBase, {
    options: {
        spriteSheetWidth: 1024,
        spriteSheetHeight: 1024,
        frameWidth: 512,
        frameHeight: 256,
        autoCalcFrames: true,
        posArray: [],
        counter: 0,
        duration: 3,
        _numColumns: 0,
        _numRows: 0,
        _numFrames: 0,
        _currFrame: 0
    },

    _create: function () {
        var self = this,
            ops = self.options,
            timeline = self.gsapTimeline();
        if (ops.autoCalcFrames) {
            self._autoCalculateFrames(self, ops);
        }
        self._defineAnimation(self, self.element, ops, timeline)
        .play();

    },

    _init: function () {
    },

    _defineAnimation: function (self, $selfElm, ops, timeline) {
        timeline.to(ops, ops.duration, {
            counter: ops.posArray.length,
            repeat: -1,
            ease: SteppedEase.config(ops.posArray.length),
            onUpdate: function () {
                if (ops.counter < ops.posArray.length) {
                    TweenMax.to($selfElm, 0, {backgroundPosition: ops.posArray[ops.counter]});
                }
            }
        });
        return self;
    },

    _autoCalculateFrames: function (self, ops) {
        var numRows = ops._numRows = Math.ceil(ops.spriteSheetHeight / ops.frameHeight),
            numCols = ops._numCols = Math.ceil(ops.spriteSheetWidth / ops.frameWidth),
            //numFrames = ops._numFrames = Math.ceil(ops._numRows * ops._numCols),
            i, j,
            yPart = '',
            xPart = '';

        ops.posArray = [];

        for (i = 0; i < numRows; i += 1) {
            yPart = -i * ops.frameHeight + 'px';
            for (j = 0; j < numCols; j += 1) {
                xPart = -j * ops.frameWidth + 'px ';
                ops.posArray.push(xPart + yPart);
            }
        }

        return self;
    },

    play: function () {

    }

})

//var boxyObj1 = {counter: 0};
//var boxyArray1 = ["-160px -160px", "-320px -160px", "-480px -160px", "-640px -160px", "-800px -160px", "-960px -160px", "-1120px -160px"];
//
//var TweenBoxy = TweenMax.to(boxyObj1, 0.5, {
//    counter: boxyArray1.length,
//    repeat: -1,
//    ease: SteppedEase.config(boxyArray1.length),
//    onUpdate: boxyTweenUpdate
//});
//
//function boxyTweenUpdate() {
//    if (boxyObj1.counter < boxyArray1.length) {
//        TweenMax.to(boxy, 0, {backgroundPosition: boxyArray1[Math.ceil(boxyObj1.counter)]});
//    }
//}
//
//document.getElementById('mybtn1').onclick = function () {
//    TweenBoxy.play();
//}
//document.getElementById('mybtn2').onclick = function () {
//    TweenBoxy.reverse();
//}
//
//
//document.getElementById('mybtn3').onclick = function () {
//    TweenBoxy.timeScale(0.25);
//}
//document.getElementById('mybtn4').onclick = function () {
//    TweenBoxy.timeScale(1);
//}
//document.getElementById('mybtn5').onclick = function () {
//    TweenBoxy.timeScale(3);
//}