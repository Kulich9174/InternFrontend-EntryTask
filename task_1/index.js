import {encoded, translations} from './data.js'

function decode(encoded,translations){
    const decoded=[];
    const uniqueId=new Set();
    const exceptions = new Set(['groupId', 'service', 'formatSize', 'ca']);

    encoded.forEach(element => {
        const decodedItem={...element};
        for(const key in decodedItem){
            if(key.endsWith('Id')&& !exceptions.has(key)){
                if(decodedItem[key] !== null && translations.hasOwnProperty(decodedItem[key])){
                    uniqueId.add(parseInt(decodedItem[key]));
                    decodedItem[key] = translations[decodedItem[key]]
                }
            }
        }
        decoded.push(decodedItem)
    });
    console.log('unique id',[...uniqueId])
    return decoded
}
const decodedData = decode(encoded, translations);
console.log(decodedData);
