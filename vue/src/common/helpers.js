module.exports.ShortString= 
/**
 * "1 2 3 4 5 6 7" => ""
 * @param {*} str  
 * @param {*} length 
 */
function (str, length) {
    const arrayWord=str.split(' ')
    if(arrayWord.length > length){
        arrayWord.splice(0,length)
        return arrayWord.join(' ')+'...'
    }
    return arrayWord.join(' ') 
}