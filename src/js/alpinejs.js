import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'
import storePage from "./modules/storePage.js";

var $ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
$ready(() => {
    storePage();
    window.Alpine = Alpine;
    Alpine.plugin(intersect);
    Alpine.start();
})

