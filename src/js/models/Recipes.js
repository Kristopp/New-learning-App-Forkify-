import axios from 'axios';
import { key, proxy } from '../config'


//Create a class for recipes object
//Every recipe will get its unique id
//By it id we can make ajax call
export default class Recipes { 
    constructor(id) { 
        this.id = id;
    } 
    async getRecipe() { 
        try { 
            const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            console.log(res)
        } catch (error) { 
            console.log(error);
            alert('Something went wrong:(')
        }
    }
// Calc cooking time logic
    calcTime() { 
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() { 
        this.servings = 4;
    }

    parseIngredients() { 
        const unitsLong = ['tablespoons', 'talbespoon', 'ounce','ounces', 'teaspoon', 'teaspoons','cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
        const units = [...unitsShort,'kg', 'g']
        
        const newIngredients = this.ingredients.map(el => { 

            // 1) change units short
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => { 
            ingredient = ingredient.replace(unit, unitsShort[i]); 
            });

            //2) remove parentheses 
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            
            //3)
            //
            //.split(" ")
            const arrIng = ingredient.split(" ");
            
            //Everytime includes() finds a element we are looking it will return its index
            //Its a good way to find a positsion if we dont now what unit we re looking for
    
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
            let objIng;
            //unit = 4cups of something
            if(unitIndex > -1) { 
                //If we have a unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1) { 
                    count = eval(arrIng[0].replace('-', '+'));
                } else { 
                    count = eval(arrIng.slice(0, unitIndex).join('+'))
                }
                objIng = { 
                    count,
                    unti: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join('')
                };

            } else if (parseInt(arrIng[0], 10)) { 
                //dont have a unit but we have a elemnt
                objIng = { 
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
               
            } else if (unitIndex === -1) { 
                //no unit
                objIng = { 
                    count: 1,
                    unit: '',
                    ingredient
                }

            }
                       
            return objIng;
            
        });
        this.ingredients = newIngredients;

    } 
    updateServings (type) { 
        //Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        this.ingredients.forEach(ing => { 
            ing.count *= (newServings / this.servings);
        });
        this.servings = newServings
    }
}

