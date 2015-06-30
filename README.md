# jui-animated-sprite
Jui-commons animated sprite using TweenMax.

This plugin allows you to take a sprite sheet and animate it.

### Options
- **spriteSheetWidth**:
- **spriteSheetHeight**:
- **frameWidth**:
- **frameHeight**:
- **autoCalcFrames**:
- **posArray**:
- **duration**:
- **repeat**:

### Methods
- **gsapTimeline**: Returns Gsap timeline.
- **timeline**: Same as `gsapTimeline`.
- **play**:  Plays the gsap timeline.
- **repeat**:  Sets the repeat flag for the gsap timeline.  `-1` for inifinite loop.
- **pause**:  Pauses the gsap timeline.
- **stop**:  Same as `pause`.
- **seek**:  Seeks on the gsap timeline.
- **destroy**:  Pauses and clears the timeline before destroying the plugin.

**Note**: `play`, `repeat`, `pause`, `seek` can be called directly on the gsap timeline (see http://greensock.com/docs/#/HTML5/GSAP/TimelineMax/)

### References:
- GSAP Library Link: http://greensock.com/gsap
- Jui-Commons Library Link: https://github.com/elycruz/jui-commons

### License
- Mit 3.0 - http://opensource.org/licenses/MIT


