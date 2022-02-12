SETUP
Run `npm install`. This will install all the required dependencies.
Run `ng serve` to start a dev server (`http://localhost:4200/`).
Run `nodemon server.js`* to start the socket listener (run in separate command window).
Run `ng g component component-name` to generate a new component.

* - if it returns an error try installing nodemon with 'npm install -g nodemon'


TO-DO:
on new upload -> clear timeout -> if this.sharescreen emit(video)
1.
WEBRTS
video lag fix (oncanplay)
crop stream to div size
stream -> start/pause/continue/end
kaj z image? a se rabi? -> lahko ostane podprto ampak se zdruzi z send-file (case jpeg/png)

2.
orodna vrstica -> upload (share file), stream commands (start/stop/pause/continue), disconnect

send question, upload quiz, upload file, share file (UPLOAD)
stream, pause/continue, stop, draw (STREAM) (pause/continue, draw -> toggle)

ikone + on hover

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
socketId -> pass to router component (not in url)
start-room -> don't simulate click?