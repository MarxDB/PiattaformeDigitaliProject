# Progetto di Piattaforme digitali per il territorio
### Marzio Della Bosca


## Specifiche di progetto

Sviluppo di una API REST, ovvero un application programming interface. A tale scopo è stato implementato un sito web in grado di supportare una comunicazione 
client-server mediante l'utilizzo di metodi GET, POST e DELETE. iL sito web ha come scopo quello di valorizzare una parte del patrimonio culturale, artistico e
storico delle Marche presentando posizione, descrizione ed indirizzo web di alcuni castelli presenti sul territorio marchigiano.

## Analisi del problema

### Goal:
- Immagazzinare le informazioni necessarie alla erogazione delle informazioni relative ai luoghi di interesse.
- Graficare le infomazioni.
- Calcolare il luogo di interesse più vicino.
- Memorizzare le recensioni.

### input:
- file csv con posizione, descrizione e indirizzo web dei luoghi di interesse.
- posizione in termini di latitudine e longitudine dal client.
- recensione di un luogo di interesse il cui valore sarà scomposto nelle chiavi: nome, orario di immissione, commento.

### output:
- lista nomi e descrizioni dei luoghi di interesse.
- nome e descrizione del luogo di interesse più vicino.
- lista delle recensioni precedentemente inserite.
- grafica con le i luoghi presenti una mappa.

## Implementazione

La pagina principale attende il caricamento dei dati dei castelli tramite un metodo GET che tramite un parser estrae i dati dal formato csv e li manda alla pagina in formato json. Per ogni luogo di interesse in memoria viene aggiunto alla mappa un marker con pop-up e plotta i dati in un container. 

Sempre sulla pagina principale il client potrà essere reindirizzato alla pagina delle recensioni o ottenere lo sua posizione sulla mappa e il luogo di interesse più vicino assieme alla sua descrizione e indirizzo web. Per accedere alla funzione l'utente dovrà accettare di condividere la sua posizione.

Nella pagina recensioni il client potrà fare una POST aggiungendo una recensione alla lista di recensioni già presenti in archivio. Al caricamento della pagina tramite un metodo GET le recensioni in archivio vengono plottate sotto alla FORM per l'inserimento della recensione.

## File di progetto:

← `README.md`

← `public/style.css`: Regole di stile per le grafiche implementate.

← `public/castelli.csv`: File formato csv contenente le informazioni dei luoghi di interesse.

← `views/wellcome.html`: Web front page.

← `views/recensioni.html`: Pagina web inerente alla sezione recensioni.

← `server.js`: Il server Node.js del sito. Contiene gli script che definiscono gli endpoint che gestiranno le risposte lato-server.

← `recensioni.json`: File formato json contenente le recensioni in archivio.

← `package.json`: Package contenente le dipendenze di progetto.

← `src/colors.json`: Collezione di colori in formato css.

### Informazioni e dipendenze di progetto:
Questo progetto utilizza un server [Node.js](https://nodejs.org/en/about/) e il framework [Fastify](https://www.fastify.io/).
Per questo progetto sono stati utilizzati i linguaggi: Javascript, html, css.

### Link utili: 

Link al progetto sulla piattaforma GLITCH:  https://progetto-piattaforme-digitali.glitch.me/

Link al sito degli Open Data Marche:        https://www.regione.marche.it/Regione-Utile/Agenda-Digitale/Open-data



