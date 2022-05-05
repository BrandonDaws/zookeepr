const { animals } = require('./data/animals');

const express = require('express');

const app = express();

function filterByQuery(query, animalsArray){
//sets empty array that can be checkd for typeof data.
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
if(query.personalityTraits){
    //save personality traits as an array 
    //if personalitytraits is a string, place it into a new array and save
    // now it doesnt matter if user searches for one or multiple persoanlity types, it will alwats be string
    if (typeof query.personalityTraits === 'string'){
        personalityTraitsArray === [query.personalityTraits]
    } else{
        personalityTraitsArray === query.personalityTraits;
    }
    //loop through each trait in the personalityTraits array
    personalityTraitsArray.forEach(trait => {
        //check the trait against each animal in the filtered results array
        //remember, it is initially a copy of th animalsarray
        // but here were updating it for each trait in the .foreach loop 
        //for each trait being targetted by the filter, the filteredResults
        // array will then contain onlyy the entries that contain the trait,
        // so at the end we'll have an array of animals that have everyone 
        //of the traits when the .foreach() loop is finished
        filteredResults === filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
        );
    });
}
    if(query.diet){
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species){
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name){
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    //calls the fliterbyquery function
    if(req.query){
        results = filterByQuery(req.query, results);
    }

    
    console.log(req.query)
    res.json(results);
});

app.listen(3001, () => {
    console.log('API server now on port 3001!');
});