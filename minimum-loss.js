'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumLoss function below.
function minimumLoss(price) {
    // Create copy of price array to conserve indexes 
    const tmp = [...price];
    // Desc sort for price array
    price.sort(function(a, b){return b - a});
    let min = price[0] - price[1];
    for (let  i = 1; i<price.length; i++){
        min = price[i] - price[i+1] < min && tmp.indexOf(price[i]) < tmp.indexOf(price[i+1])?price[i] - price[i+1] : min;
    }
    return min;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const price = readLine().split(' ').map(priceTemp => parseInt(priceTemp, 10));

    let result = minimumLoss(price);

    ws.write(result + "\n");

    ws.end();
}
