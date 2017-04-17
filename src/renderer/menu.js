const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const menu = new Menu();
// TODO: context menu?

window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    menu.popup(remote.getCurrentWindow());
}, false);
