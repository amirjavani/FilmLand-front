function getImageUrl(name){
    const url = new URL(`../../Assets/Slider/${name}`, import.meta.url).href;
    console.log(`getImageUrl: Constructed URL: ${url}`);
    return url;
}



export {getImageUrl}