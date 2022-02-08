SETUP
Run `npm install`. This will install all the required dependencies.
Run `ng serve` to start a dev server (`http://localhost:4200/`).
Run `nodemon server.js`* to start the socket listener (run in separate command window).
Run `ng g component component-name` to generate a new component.

* - if it returns an error try installing nodemon with 'npm install -g nodemon'


TO-DO:
2.
orodna vrstica -> upload (share file), stream commands (start/stop/pause/continue), disconnect

send question, upload quiz, upload file, share file (UPLOAD)
stream, pause/continue, stop, draw (STREAM) (pause/continue, draw -> toggle)

ikone + on hover

3.
admin console 2 -> status messages (uploaded quiz, stream running/paused)

5.
stili
------
6.
v room dodaj pošiljanje posameznega vprašanja (in statistiko odgovorov, samo za admina)
on send single question -> pause stream, show question, wait for answers, close question viewer, unpause stream

7.
video lag fix (oncanplay)
crop stream to div size
stream -> start/pause/continue/end
on new upload -> clear timeout
kaj z image? a se rabi? -> lahko ostane podprto ampak se zdruzi z send-file (case jpeg/png)

IMPROVEMENTS:
boljša rešitev za cors kot cors origin * (ni varno)
upload in fileDisplay -> ne samo pdf/img ampak tudi ppt/odt/word (ipd.)
shranjevanje vseh naloženih datotek v temp dir, ki je prikazan kot quick select ob strani
dodajanje slike k vprašanju
risanje -> text field
razdrobitev kode -> quiz-viewer component, video-component, ...
shranjevanje sob -> namesto localStorage na server.js rooms = { room: admin, [users] }