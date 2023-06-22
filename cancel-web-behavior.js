// Prevent context menu opening when long tap on links
window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};