SETUP
Run `npm install`. This will install all the required dependencies.
Run `ng serve` to start a dev server (`http://localhost:4200/`).
Run `nodemon server.js`* to start the socket listener (run in separate command window).
Run `ng g component component-name` to generate a new component.

* - if it returns an error try installing nodemon with 'npm install -g nodemon'


TO-DO:
draw on scroll -> mouse offset (razen ce nikoli ne bo scroll ?)

upload file -> upload quiz (clear file)

crop stream (better & check with file upload)
stream pause (fix black screen)
stream stop/start
admin console status messages (uploaded quiz, stream started/ended)

question type radio button
izbira tipa vprašanja kot dropdown/radio (essay, single choice, multiple choice)

orodna vrstica ikone ? + on hover
=============================
stili

v room dodaj pošiljanje posameznega vprašanja
((on send single question -> pause stream, show question, wait for answers, close question viewer, unpause stream))

IMPROVEMENTS:
boljša rešitev za cors kot cors origin * (ni varno)
upload in fileDisplay -> ne samo pdf/img ampak tudi ppt/odt/word (ipd.)
shranjevanje vseh naloženih datotek v temp dir, ki je prikazan kot quick select ob strani
dodajanje slike k vprašanju
risanje -> text field
razdrobitev kode -> quiz-viewer component, video-component, ...

start room -> brez simulacije klika (.click()) ?
upload file/image -> združi kodo ?
console warning critical dependency ?
