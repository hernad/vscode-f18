

const currentYear = new Date().getFullYear();

console.log( `current year=${currentYear}`, currentYear.toString() == '2020' );

const cCurrentYear = currentYear.toString().trim();
const cPreviousYear = (currentYear - 1).toString().trim();

console.log( `currentY=${cCurrentYear}, previousY=${cPreviousYear}`);


const dbName = 'bringout_2020';
const dbNamePg = dbName.replace( `_${cCurrentYear}`, `_${cPreviousYear}`);

console.log( `currentDb=${dbName}, previousDb=${dbNamePg}`);
