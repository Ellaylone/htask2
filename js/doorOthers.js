// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {

    DoorBase.apply(this, arguments);
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));

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
    DoorBase.apply(this, arguments);
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));

    var chains = [
        new ChainRiddle(this.popup.querySelector('.chain_0')),
        new ChainRiddle(this.popup.querySelector('.chain_1'))
    ];

    chains.forEach(function(c){
        // c.element.addEventListener('pointermove', _onChainPointerMove.bind(this));
        // c.element.addEventListener('pointerup', _onChainPointerUp.bind(this));

        c.element.addEventListener('touchend', _onChainTouchUp.bind(this));
        c.element.addEventListener('touchmove', _onChainPointerMove.bind(this));
    }.bind(this));

    function _onChainTouchUp(e) {
        var chainsToReset = [];
        chains.forEach(function(chain, i) {
            chainsToReset[i] = true;
        });

        if(typeof e.touches !== 'undefined' && e.touches.length > 0){
            [].forEach.call(e.touches, function(touch){
                chainsToReset.forEach(function(chainStatus, chainId){
                    if(touch.target == chains[chainId].element){
                        chainsToReset[chainId] = false;
                    }
                })
            })
        }

        chainsToReset.forEach(function(chainStatus, chainId){
            if(chainStatus){
                chains[chainId].element.classList.remove('chain_pressed');
                if(chains[chainId].element.style.minHeight !== chains[chainId].maxOffset + 'px'){
                    chains[chainId].element.style.minHeight = chains[chainId].minOffset + 'px';
                }
            }
        });
    }

    function _onChainPointerMove(e) {
        var that = this;
        if(typeof e.targetTouches !== 'undefined' && e.targetTouches.length > 0){
            for(var i = 0; i < e.targetTouches.length; i++){
                chains.forEach(function(chain){
                    if(e.targetTouches[i].target == chain.element){
                        chain.element.classList.add('chain_pressed');
                        chain.move(e.targetTouches[i]);
                        checkCondition.apply(that);
                    }
                });
            }
        }
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
    

    // ==== Напишите свой код для открытия второй двери здесь ====
    // Для примера дверь откроется просто по клику на неё
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
    DoorBase.apply(this, arguments);

    var pX, pY, kX = 0, kY = 0;
    var keys = [
        this.popup.querySelector('.key_0')
    ];

    keys.forEach(function(k){
        k.addEventListener('pointerdown', _onKeyPointerDown.bind(this));
        k.addEventListener('pointerup', _onKeyPointerUp.bind(this));
        k.addEventListener('pointerleave', _onKeyPointerUp.bind(this));
        k.addEventListener('pointercancel', _onKeyPointerUp.bind(this));
        this.popup.addEventListener('pointermove', _onKeyPointerMove.bind(this));
    }.bind(this));

    function _onKeyPointerDown(e){
        pX = e.pageX - kX;
        pY = e.pageY - kY;
    }

    function _onKeyPointerUp(e){
        kX = e.pageX - pX;
        kY = e.pageY - pY;
        checkCondition.apply(this);
    }

    function _onKeyPointerMove(e){
        keys[0].style.transform = 'translate3d(' + (e.pageX - pX) + 'px, ' + (e.pageY - pY) + 'px, 0)';
    }

    function checkCondition(){
        var isOpened = true;
        keys.forEach(function(k) {
            if (!doElsCollide(k, document.querySelector('.lock_0'), 1, 0.3)) {
                isOpened = false;
            }
        });

        if (isOpened) {
            this.unlock();
        }
    }

    // ==== Напишите свой код для открытия третей двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
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
    // Для примера сундук откроется просто по клику на него
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
