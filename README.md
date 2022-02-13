SETUP
Run `npm install`. This will install all the required dependencies.
Run `ng serve` to start a dev server (`http://localhost:4200/`).
Run `nodemon server.js`* to start the socket listener (run in separate command window).
Run `ng g component component-name` to generate a new component.

* - if it returns an error try installing nodemon with 'npm install -g nodemon'


TO-DO:

draw on scroll -> mouse offset (razen ce nikoli ne bo scroll ?)
upload file -> upload quiz (clear file)
console warning critical dependency

1.
WEBRTS
crop stream to div size
stream -> start/pause/continue/end
kaj z image? a se rabi? -> lahko ostane podprto ampak se zdruzi z send-file (case jpeg/png)

2.
orodna vrstica -> spodaj
ikone ? + on hover

3.
admin console 2 -> status messages (uploaded quiz, stream running/paused)
=============================
4.
stili (admin console, question builder (add hint for question types), menu, question viewer)

5.
v room dodaj pošiljanje posameznega vprašanja
on send single question -> pause stream, show question, wait for answers, close question viewer, unpause stream

IMPROVEMENTS:
boljša rešitev za cors kot cors origin * (ni varno)
upload in fileDisplay -> ne samo pdf/img ampak tudi ppt/odt/word (ipd.)
shranjevanje vseh naloženih datotek v temp dir, ki je prikazan kot quick select ob strani
dodajanje slike k vprašanju
risanje -> text field
razdrobitev kode -> quiz-viewer component, video-component, ...

izbira tipa vprašanja kot dropdown/radio (essay, single choice, multiple choice)
start-room -> don't simulate click?