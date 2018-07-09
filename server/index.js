const express = require('express');
const app = express();


let test = [
    {id: 1, name: 'josh'},
    {id: 2, name: 'joshsdfadf'},
    {id: 3, name: 'joshsdf'},
    {id: 4, name: 'jossdfadsfh'},
    {id: 5, name: 'jfsdfosh'},
    {id: 6, name: 'fasdfajosh'},
    {id: 7, name: 'jaosh'},
    {id: 8, name: 'aaajfasfasdfosh'},
    {id: 9, name: '33rfasefasfdsajosh'}
]

app.get('/api/test', (req, res) => {
    res.status(200).json(test);
});

app.listen(4000, () => {
    console.log('Example app listening on port 4000!');
});
