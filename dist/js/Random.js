gooseFilter = (birds) => { 
  let geese = ["African", "Roman Tufted", "Toulouse", "Pilgrim", "Steinbacher"];
 for(let i = 0;i <geese.length; i++) { 
   if(geese[i] )
   
 }
 }

gooseFilter(["Mallard", "Hook Bill", "African", "Crested", "Pilgrim", "Toulouse", "Blue Swedish"])  

const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

/**
 * Filter array items based on search criteria (query)
 */
const filterItems = (arr, query) => {
  return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) > -1);
};

console.log(filterItems(fruits, 'ap')); // ['apple', 'grapes']
console.log(filterItems(fruits, 'an')); // ['banana', 'mango', 'orange']