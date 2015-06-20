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
        repeat: -1,
        _numColumns: 0,
        _numRows: 0,
        _numFrames: 0,
        _currFrame: 0
    },

    _init: function () {
        var self = this,
            ops = self.options,
            timeline = self.gsapTimeline();
        if (ops.autoCalcFrames) {
            self._autoCalculateFrames(self, ops);
        }
        self._defineAnimation(self, self.element, ops, timeline);
    },

    _defineAnimation: function (self, $selfElm, ops, timeline) {
        timeline.to(ops, ops.duration, {
            counter: ops.posArray.length,
            repeat: ops.repeat,
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

        self._ensureFrameDims(self, ops);

        var numRows = ops._numRows = Math.ceil(ops.spriteSheetHeight / ops.frameHeight),
            numCols = ops._numCols = Math.ceil(ops.spriteSheetWidth / ops.frameWidth),
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

    _ensureFrameDims: function (self, ops) {
        if (ops.frameWidth === null) {
            ops.frameWidth = self.element.width();
        }
        if (ops.frameHeight === null) {
            ops.frameHeight = self.element.height();
        }
        return self;
    },

    play: function () {
        this.gsapTimeline().play();
        return this;
    }

});
