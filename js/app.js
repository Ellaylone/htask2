/**
 * @class App
 * @param {Element} el
 */
function App(el) {
    var appEl = el,
        doors = [
            new Door0(0, onUnlock),
            new Door1(1, onUnlock),
            new Door2(2, onUnlock),
            new Box(3, onUnlock)
        ];

    this.doors = doors;

    /**
     * Callback вызывается в коде двери
     * Тут даем возможность открыть следующие двери
     */
    function onUnlock() {
        var previousUnlocked;

        // Даем открыть следующую дверь
        for (var i = 0; i < doors.length; i++) {
            if (!doors[i].isLocked) {
                previousUnlocked = true;
            } else {
                if (previousUnlocked && doors[i].isLocked) {
                    doors[i].enable();
                    break;
                }
            }
        }
    };
}

//NOTE check if elements collide
function doElsCollide(el1, el2, c1, c2) {
    var bodyRect = document.body.getBoundingClientRect();
    var elemRect1 = el1.getBoundingClientRect();
    var elemRect2 = el2.getBoundingClientRect();
    el1.offsetBottom = elemRect1.top - bodyRect.top + c1 * el1.offsetHeight;
    el1.offsetRight = elemRect1.left - bodyRect.left + c1 * el1.offsetWidth;
    el2.offsetBottom = elemRect2.top - bodyRect.top + c2 * el2.offsetHeight;
    el2.offsetRight = elemRect2.left - bodyRect.left + c2 * el2.offsetWidth;

    return !((el1.offsetBottom < elemRect2.top - bodyRect.top) ||
             (elemRect1.top - bodyRect.top > el2.offsetBottom) ||
             (el1.offsetRight < elemRect2.left - bodyRect.left) ||
             (elemRect1.left - bodyRect.left > el2.offsetRight));
};

// Start the app
var app = new App(document.querySelector('.app'));
