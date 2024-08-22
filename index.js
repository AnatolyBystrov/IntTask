//  Создаем таблицу 
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rows = 10;
const cols = 10;
const array = Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => generateRandomNumber(-100, 100))
);

//  Выводим таблицу
console.log("Step 2: Generated 10x10 array:");
array.forEach(row => {
    console.log(row.map(num => num.toString().padStart(5, ' ')).join(' '));
});

console.log("\nStep 3: Processing array to find the row with the minimum number...");

//  Ищем минимальное число и отмечаем его строку
let minNumber = Infinity;
let minRowIndex = -1;
array.forEach((row, index) => {
    const rowMin = Math.min(...row);
    if (rowMin < minNumber) {
        minNumber = rowMin;
        minRowIndex = index;
    }
});

console.log(`\nStep 3 Result: Row ${minRowIndex + 1} contains the minimum number ${minNumber}. Marking this row with "*":`);
array.forEach((row, index) => {
    let output = row.map(num => num.toString().padStart(5, ' ')).join(' ');
    if (index === minRowIndex) {
        output = '*' + output.substring(1);
    }
    console.log(output);
});

console.log("\nStep 4: Finding the smallest positive number in each row...");

// Находим наименьшее положительное число в каждой строке
array.forEach((row, index) => {
    const positiveNumbers = row.filter(num => num > 0);
    const minPositive = positiveNumbers.length > 0 ? Math.min(...positiveNumbers) : 'None';
    console.log(`Row ${index + 1}: Smallest positive number = ${minPositive}`);
});

console.log("\nStep 5: Calculating minimum replacements needed to avoid 3 consecutive same-sign numbers...");

//  Считаем, сколько чисел нужно поменять, чтобы избежать трёх одинаковых знаков подряд
function minReplacements(row) {
    let replaceCount = 0;
    let streakCount = 1;
    for (let i = 1; i < row.length; i++) {
        if ((row[i] > 0 && row[i - 1] > 0) || (row[i] < 0 && row[i - 1] < 0)) {
            streakCount++;
            if (streakCount == 3) {
                replaceCount++;
                streakCount = 1; 
            }
        } else {
            streakCount = 1;
        }
    }
    return replaceCount;
}

array.forEach((row, index) => {
    const replacements = minReplacements(row);
    console.log(`Row ${index + 1}: Minimum replacements needed to avoid 3 consecutive same-sign numbers = ${replacements}`);
});

console.log("\nProcess completed.");
