const loadUtils = () => new Promise((resolve, reject) => {
    let tag = document.createElement("script");
    tag.src = "/assets/js/util.js";
    tag.onload = () => resolve();
    tag.onerror = () => reject();
    document.head.appendChild(tag);
});

const init = async () => {
    try {
        await loadExternalResource("/assets/js/live2d-widget/autoload.js", "js");
        await loadExternalResource("/assets/js/publicSacrificeDay/index.js", "js");
    } catch (e) {console.error(e)} finally {
        initLive2d();
    }
}

loadUtils().then(init);