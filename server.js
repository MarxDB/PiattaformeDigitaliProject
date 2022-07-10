const express = require("express");      // IMPORT EXPRESS
const data = require("fs");              // IMPORT FASTISY
const app = express();
const stringify = require('csv-stringify').stringify;      // SETTING CSV PARSER
const parse = require('csv-parse').parse;                  

const dataReader = data.readFileSync("recensioni.json");   // LINKING PARSER JSON


app.use(express.json());                                   // SETTING EXPRESS
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let recensioni = JSON.parse(dataReader);                   // ACCESSO IN SCRITTURA/LETTURA A recensioni.json



app.engine('html', require('ejs').renderFile);            // VIEW ENGINE SETUP configura l'endpoint grafico
app.set('view engine', 'html');
app.set('views', __dirname);

//-----METODI GET - POST - DELETE

//-----GET PER RENDERING GRAFICO wellcome.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/wellcome.html");
});

//-----GET PER RENDERING GRAFICO recensioni.html
app.get("/recensioni", (req, res) => {
  res.sendFile(__dirname + "/views/recensioni.html");
});

//-----GET PER LISTA RECENSIONI IN recensioni.json
app.get("/db/recensioni", (req,res) => {
  if (recensioni.length == 0){
    res.type('text/plain').send('Non ci sono recensioni in archivio.');
    return 0;
  }
  
  res.json(recensioni);
});  


//----GET CON PARSING DA CSV PER LISTA POSIZIONI/DESCRIZIONE CASTELLI DA castelli.csv
app.get('/castelcsv', (req, res) => {
  console.log("Carico posizione castelli...");
  const markersInfo = [];                                  //[[lat,lon], descrizione]
                                                           //Comune,Provincia,Nome,Latitudine,Longitudine,Url
  data.createReadStream(__dirname+'/public/castelli.csv')
    .pipe(parse({delimeter: ",", from_line: 2}))
    .on("data", function (row){
    
    const descrizione = "Castello "+row[2]+"<br>"+"Provincia: "+row[1]+"<br>"+"Comune: "+row[0]+"<br>"
          +"Sito web: <a href=\"http://" + row[5] + "\">" + row[5] + "</a><br><br>";
    markersInfo.push([parseFloat(row[3]), parseFloat(row[4])]);
    markersInfo.push(descrizione);
  })
  .on("end", function () {     
      return res.json({data: markersInfo});
    })
    .on("error", function (error) {
      console.log(error.message);
    });
});

//-----POST DA recensioni.html A recensioni.json
app.post("/review", (req, res) => {
  const review = req.body;
  console.log(review); 
  recensioni.push(review); 
  data.writeFileSync("recensioni.json", JSON.stringify(recensioni)); 
  console.log(recensioni.length);
  res.send("Recensione aggiunta!"); 
});

//-----DELETE RECENSIONE TRAMITE NOME E LUOGO 
app.delete("/recensioni/:nome/:luogo", (req, res) => {
  const nome = req.params.nome;
  const luogo = req.params.luogo;
  var index = null;
  
  for(let i=0; i<recensioni.length;i++){
    if(recensioni[i].nome === nome && recensioni[i].luogo === luogo)
      index = i;     
  }
  if(index == null)
    res.sendStatus(404);
  else{
    recensioni.splice(index, 1);
    data.writeFileSync("recensioni.json", JSON.stringify(recensioni));
    console.log(index);
    res.send("La recensione è stata rimossa!");
  }  
});


//-----DEFINIZIONE PORTA D'ACCESSO
app.listen(process.env.PORT || 3000, () =>
  console.log("Server listen on " + process.env.PORT)
)