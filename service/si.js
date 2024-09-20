const express = require('express')
const cors= require('cors')
const app = express()
const port = 3000

app.use(cors())//esto es solo para que  la app funcione si corro el front y back en la misma computadora

//hay que hacer un endpoint para cada cosa, eventos, personas, obras
//primero son los get que son los mas faciles y despues van los put que son un temita a veces(busquen requests en google)
app.get('/api/eventos', (req, res) => {
  res.json([
    { id: 1, title: 'Card 1', href:'evento1', image: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'alto evento wachooo', eventName:'joda en la unne', eventStartDate:'01/01/0/2001', eventFinishDate:'01/01/2026' },
    { id: 2, title: 'Card 2', href:'evento2', image: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'AAAA', eventName:'suicidioMasivo en diseño', eventStartDate:'01/01/0/2001', eventFinishDate:'01/01/2026' },
    { id: 3, title: 'Card 3', href:'evento3', image: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', eventName:'Evento1', eventStartDate:'01/01/0/2001', eventFinishDate:'01/01/2026' },
    { id: 4, title: 'Card 4', href:'evento4', image: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', eventName:'Evento1', eventStartDate:'01/01/0/2001', eventFinishDate:'01/01/2026' },
    { id: 5, title: 'Card 5', href:'evento5', image: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', eventName:'Evento1', eventStartDate:'01/01/0/2001', eventFinishDate:'01/01/2026' },
    { id: 6, title: 'Card 6', href:'evento6', image: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', eventName:'Evento1', eventStartDate:'01/01/0/2001', eventFinishDate:'01/01/2026'},
    // Añade más cards si es necesario
]);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})