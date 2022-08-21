/* eslint-disable no-const-assign */
const buildSqlStatement = () => {
const array = ['Manchester', 'Liverpool'];

    const sqlStatement = 'SELECT * FROM cities_table WHERE city=? and mobility =?'
  
    for(let i=0; i < array; i++) {
      if(i != array.length - 1) {
        sqlStatement += `city=${Array[i]} OR `
      } else {
        sqlStatement += `city=${Array[i]}`
      }
    }}
    console.log(buildSqlStatement)