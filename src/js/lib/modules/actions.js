import $ from '../core';

$.prototype.html = function(content) {
    for(let i = 0; i < this.length; i++) {
        if(content) {
            this[i].innerHTML = content;
        } else {
            return this[i].innerHTML;
        }
    }
    return this;
};


$.prototype.eq = function(i) {
    const swap = this[i];
    const objLength = Object.keys(this).length;

    for(let i = 0; i < objLength; i++) {
        delete this[i];
    }

    this[0] = swap;
    this.length = 1;
    return this;
};

$.prototype.index = function() {
    const parent = this[0].parentNode;
    const childs = [...parent.children];

    const findMyIndex = (item) => {
        return item == this[0];
    };

    return childs.findIndex(findMyIndex);
};

$.prototype.find = function(selector) {
    let numberOfItems = 0;
    let counter = 0

    const copyObj = Object.assign({}, this);
     for(let i = 0; i < copyObj.length; i++) {
         const arr = copyObj[i].querySelectorAll(selector);
        if(arr.length == 0) {
            continue;
        }

        for(let k = 0; k < arr.length; k++) {
            this[counter] = arr[k];
            counter++;
        }

        numberOfItems += arr.length;
    }
    
    this.length = numberOfItems;

    const objLength = Object.assign({}, this);
    for(;numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;
};

$.prototype.closest = function(selector) {
    let counter = 0;

    for(let i = 0; i < this.length; i++) {
        // if (!this) return null;
        // if (this.matches(selector)) 
        // return this;
        // if (!this.parentElement) {
        //     return null;
        // };
        this[i] = this[i].closest(selector);
        counter++;
    }

    const objLength = Object.assign({}, this);
    for(;counter < objLength; counter++) {
        delete this[counter];
    }

    return this;
};

$.prototype.siblings = function() {
    let numberOfItems = 0;
    let counter = 0

    const copyObj = Object.assign({}, this);
     for(let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].parentNode.children;

        for(let k = 0; k < arr.length; k++) {
            if(copyObj[i] === arr[k]) {
                continue;
            }

            this[counter] = arr[k];
            counter++;
        }

        numberOfItems += arr.length - 1;
    }
    
    this.length = numberOfItems;

    const objLength = Object.assign({}, this);
    for(;numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;
};
