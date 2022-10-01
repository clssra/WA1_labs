"use strict";

//const words = ["spring", "yellow", "blu", "dark"];

const words2 = ['yu', 'cat'];

const words = ["spring","summer", "a", "ab", "abc", "autumn","winter"];

words.forEach((item,index) => {
    if(item.length < 2)
        words[index] = "";
    else if(item.length == 2 || item.length == 3)
        words[index] = item + item;
    else 
        words[index] = item.substring(0,2) + item.substring(item.length -2, item.length);
});
console.log(words);





