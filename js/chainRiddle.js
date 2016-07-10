function ChainRiddle(element) {
    this.element = element;
    this.bodyRect = document.body.getBoundingClientRect();
    this.elemRect = this.element.getBoundingClientRect();
    this.offset = this.elemRect.top - this.bodyRect.top;
    this.minOffset = 30;
    this.maxOffset = 230;
}

ChainRiddle.prototype = {
    move: function(touch){
        var moveOffset = touch.pageY - this.offset;

        if(moveOffset < this.minOffset){
            moveOffset = this.minOffset;
        } else if(moveOffset > this.maxOffset){
            moveOffset = this.maxOffset;
        }

        this.element.style.minHeight = moveOffset + 'px';
    }
}
