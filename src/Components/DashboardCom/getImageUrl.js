function getImageUrl(path){
    const url = new URL(path, import.meta.url).href;
    console.log(`getImageUrl: Constructed URL: ${url}`);
    return url;
}



export {getImageUrl}