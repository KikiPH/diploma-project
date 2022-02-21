SETUP
Run `npm install`. This will install all the required dependencies.
Run `ng serve` to start a dev server (`http://localhost:4200/`).
Run `nodemon server.js`* to start the socket listener (run in separate command window).
Run `ng g component component-name` to generate a new component.

* - if it returns an error try installing nodemon with 'npm install -g nodemon'


TO-DO:
orodna vrstica ikone ? + on hover (fontawesome)

if not streaming -> no message
if quiz -> no stream, no draw

crop stream (better & check with file upload)
border stream size window
remove hidden answer types for essay questions
sticky footer (guest -> big quiz)
=============================
stili

stream pause -> fix black screen (odstrani funkcijo pause/play ?)
v room dodaj pošiljanje posameznega vprašanja (quick builder on click -> send -> show answers -> dismiss on click)

IMPROVEMENTS:
boljša rešitev za cors kot cors origin * (ni varno)
upload in fileDisplay -> ne samo pdf/img ampak tudi ppt/odt/word (ipd.)
shranjevanje vseh naloženih datotek v temp dir, ki je prikazan kot quick select ob strani
dodajanje slike k vprašanju
risanje -> text field
razdrobitev kode -> quiz-viewer component, video-component, ...

start room -> brez simulacije klika (.click()) ?
upload file/image -> združi kodo ?
status messages -> združi kodo ?
console warning critical dependency ?
