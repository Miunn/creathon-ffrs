window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

function absorbEvent_(event) {
    var e = event || window.event;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}

function preventLongPressMenu(node) {
    node.ontouchstart = absorbEvent_;
    node.ontouchmove = absorbEvent_;
    node.ontouchend = absorbEvent_;
    node.ontouchcancel = absorbEvent_;
}

Array.from(document.getElementsByTagName("a")).forEach((elmt) => {
    preventLongPressMenu(elmt);
});

