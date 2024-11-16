const isPublicSacrificeDay = () => {
    const day = new Date().toISOString().slice(5, 10).replace("-", "");
    const PSFarr = new Array("0707", "0909", "0918", "1109", "1213");
    return PSFarr.includes(day);
}

if (isPublicSacrificeDay())
    document.getElementsByTagName("html")[0].setAttribute("style", "filter:gray !important;filter:grayscale(100%);-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);");