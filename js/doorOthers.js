// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {

    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function(b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */

function Door1(number, onUnlock) {
    // ==== Напишите свой код для открытия второй двери здесь ====
    DoorBase.apply(this, arguments);

    var chains = [
        new ChainRiddle(this.popup.querySelector('.chain_0')),
        new ChainRiddle(this.popup.querySelector('.chain_1'))
    ];

    chains.forEach(function(c){
        c.element.addEventListener('pointerdown', _onChainPointerDown.bind(this), false);
        c.element.addEventListener('pointerup', _onChainPointerUp.bind(this), false);
        c.element.addEventListener('pointercancel', _onChainPointerUp.bind(this), false);
    }.bind(this));

    this.popup.addEventListener('pointermove', _onChainPointerMove.bind(this), false);

    function _onChainPointerDown(e) {
        var elFromPoint = document.elementsFromPoint(e.pageX, e.pageY);
        chains.some(function(c){
            if(elFromPoint.indexOf(c.element) >= 0) {
                c.element.setPointerCapture(e.pointerId);
                c.element.classList.add('chain_pressed');
                return true;
            }
        });
    }

    function _onChainPointerUp(e) {
        chains.some(function(c) {
            if(c.element == e.target){
                c.element.classList.remove('chain_pressed');
                c.element.style.minHeight = c.minOffset + 'px';
                return true;
            }
        });
    }

    function _onChainPointerMove(e) {
        var that = this;
        chains.forEach(function(chain){
            if(e.target == chain.element){
                chain.move(e);
                checkCondition.apply(that);
            }
        });
    }

    function checkCondition() {
        var isOpened = true;
        chains.forEach(function(c) {
            if (c.element.offsetHeight !== c.maxOffset) {
                isOpened = false;
            }
        });

        if(isOpened){
            this.unlock();
        }
    }
    // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */

function Door2(number, onUnlock) {
    // ==== Напишите свой код для открытия третей двери здесь ====
    DoorBase.apply(this, arguments);
    //NOTE Вспомогательные переменные
    var offsetLimit = 200;

    var pX, pY, kX = 0, kY = 0;
    var keys = [
        this.popup.querySelector('.key_0')
    ];

    var chains = [
        new ChainRiddle(this.popup.querySelector('.chain_0'))
    ];

    var counter = this.popup.querySelector('.chain_1');

    var brick = this.popup.querySelector('.brick_0');

    var lock = this.popup.querySelector('.lock_0');

    //NOTE Мой телефон в этом попапе упорно отказывается
    // выстреливать второе событие pointerdown,
    // найти причину мне не удалось -
    // поэтому сделал на touchevents 
    keys.forEach(function(k){
        k.addEventListener('touchstart', _onKeyTouchDown.bind(this), false);
        k.addEventListener('touchend', _onKeyTouchUp.bind(this), false);
        k.addEventListener('touchcancel', _onKeyTouchUp.bind(this), false);
        k.addEventListener('touchmove', _onTouchMove.bind(this), false);
    }.bind(this));

    chains.forEach(function(c) {
        c.maxOffset = offsetLimit;
        c.element.addEventListener('touchstart', _onChainTouchDown.bind(this), false);
        c.element.addEventListener('touchend', _onChainTouchUp.bind(this), false);
        c.element.addEventListener('touchcancel', _onChainTouchUp.bind(this), false);
        c.element.addEventListener('touchmove', _onTouchMove.bind(this), false);
    }.bind(this));

    function _onChainTouchDown(e) {
        e.target.classList.add('chain_pressed');
        counter.classList.add('chain_pressed');
        brick.classList.add('brick_pressed');
    }

    function _onChainTouchUp(e) {
        chains.some(function(c){
            if(c.element == e.target){
                e.target.classList.remove('chain_pressed');
                e.target.style.minHeight = c.minOffset + 'px';

                counter.classList.remove('chain_pressed');
                counter.style.minHeight = offsetLimit + 'px';

                brick.classList.remove('brick_pressed');
                brick.style.transform = 'translate3d(0px, 0px, 0)';
                return true;
            }
        });
    }

    function _onTouchMove(e) {
        var that = this;
        if(typeof e.touches != 'undefined' && e.touches.length > 0){
            [].forEach.call(e.touches, function(touch){
                chains.some(function(c){
                    if(touch.target == c.element){
                        c.move(touch);
                        requestAnimationFrame(function(){
                            counter.style.minHeight = (offsetLimit - c.moveOffset) + 'px';
                            brick.style.transform = 'translate3d(0px, -' + (c.moveOffset - c.minOffset) + 'px, 0)';
                        });
                        return true;
                    }
                });
                keys.some(function(k){
                    if(touch.target == k){
                        k.style.transform = 'translate3d(' + (touch.pageX - pX) + 'px, ' + (touch.pageY - pY) + 'px, 0)';
                        return true;
                    }
                });
            });
        }
        
    }

    function _onKeyTouchDown(e){
        [].forEach.call(e.touches, function(touch){
            keys.some(function(k){
                if(touch.target == k) {
                    pX = touch.pageX - kX;
                    pY = touch.pageY - kY;
                    return true;
                }
            });
        });
    }

    function _onKeyTouchUp(e){
        checkCondition.apply(this);
        kX = pX = 0;
        kY = pY = 0;
        keys[0].style.transform = 'translate3d(0, 0, 0)';
    }

    function checkCondition(){
        var isOpened = true;
        keys.forEach(function(k) {
            if (!doElsCollide(k, lock, 1, 0.5) || doElsCollide(brick, lock, 1, 0.5)) {
                isOpened = false;
            } else {
                k.style.display = 'none';
            }
        });

        if (isOpened) {
            this.unlock();
        }
    }
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */

function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия сундука здесь ====
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
