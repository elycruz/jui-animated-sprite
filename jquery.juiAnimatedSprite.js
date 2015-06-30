/**
 * Created by Ely on 6/15/2015.
 */
$.widget('jui.juiAnimatedSprite', $.jui.juiBase, {
    options: {
        spriteSheetWidth: null,
        spriteSheetHeight: null,
        frameWidth: null,
        frameHeight: null,
        autoCalcFrames: true,
        gsapTimelineConstructor: TimelineMax,
        posArray: [],
        counter: 0,
        duration: 3,
        repeat: 0,
        _numColumns: 0,
        _numRows: 0,
        _numFrames: 0,
        _currFrame: 0
    },

    _init: function () {
        var self = this,
            ops = self.options,
            timeline = self.gsapTimeline();

        // Ensure timeline is empty (incase user has called this plugin again after initialization without any options).
        timeline.clear()
                .eventCallback('onUpdate', null);

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

    timeline: function (timeline) {
        return this.gsapTimeline(timeline);
    },

    gsapTimeline: function (timeline) {
        return this._timeline(timeline, 'timeline', this.options);
    },

    play: function () {
        var timeline = this.gsapTimeline();
        if (timeline.repeat() !== -1 && timeline.duration() === timeline.time()) {
            timeline.restart();
        }
        else {
            timeline.play();
        }
        return this;
    },

    repeat: function (value) {
        var retVal = this,
            isGetterCall = typeof value === 'undefined';
        if (isGetterCall) {
            retVal = this.gsapTimeline().repeat();
        }
        else {
            this.gsapTimeline().repeat(parseFloat(value));
        }
        return retVal;
    },

    pause: function () {
        return this.stop();
    },

    stop: function () {
        this.gsapTimeline().pause();
        return this;
    },

    seek: function (position, suppressEvents) {
        position = parseFloat(position);
        suppressEvents = suppressEvents || true;
        this.gsapTimeline().seek(position, suppressEvents);
        return this;
    },

    destroy: function () {
        this.gsapTimeline()
            .pause()
            .clear();
        this._super();
    }

});
