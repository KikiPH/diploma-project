SETUP
Run `npm install`. This will install all the required dependencies.
Run `ng serve` to start a dev server (`http://localhost:4200/`).
Run `nodemon server.js`* to start the socket listener (run in separate command window).
Run `ng g component component-name` to generate a new component.

* - if it returns an error try installing nodemon with `npm install -g nodemon`

stili -> draw
=============================
IMPROVEMENTS:
boljša rešitev za cors kot cors origin * (ni varno)
upload in fileDisplay -> ne samo pdf/img ampak tudi ppt/odt/word (ipd.)
shranjevanje vseh naloženih datotek v temp dir, ki je prikazan kot quick select ob strani
dodajanje slike k vprašanju
risanje -> text field
razdrobitev kode -> quiz-viewer component, video-component, ...
room -> pošiljanje posameznega vprašanja (quick builder on click -> send -> show answers -> dismiss on click)

start room -> brez simulacije klika (.click())
remove hidden answer types for essay questions (change JSON parser)
upload file/image -> združi kodo
status messages -> združi kodo
console warning critical dependency ?

admin-console message text color
quiz-builder remove question (X) -> vedno desno zgoraj (trenutno ni pri dolgih vprašanjih)
quiz display -> združi classe
stream -> send new file (trenutno ustavi stream)
stream pause/play button -> on pause black screen (naredi background color + text "paused")
