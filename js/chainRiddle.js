function ChainRiddle(element) {
    this.element = element;
    this.bodyRect = document.body.getBoundingClientRect();
    this.elemRect = this.element.getBoundingClientRect();
    this.offset = this.elemRect.top - this.bodyRect.top;
    this.minOffset = 30;
    this.maxOffset = 230;
    this.moveOffset = 30;
}

ChainRiddle.prototype = {
    move: function(e){
        this.moveOffset = e.pageY - this.offset;

        if(this.moveOffset < this.minOffset){
            this.moveOffset = this.minOffset;
        } else if(this.moveOffset > this.maxOffset){
            this.moveOffset = this.maxOffset;
        }

        this.element.style.minHeight = this.moveOffset + 'px';
    }
}
