SETUP
Run `npm install`. This will install all the required dependencies.
Run `ng serve` to start a dev server (`http://localhost:4200/`).
Run `nodemon server.js`* to start the socket listener (run in separate command window).
Run `ng g component component-name` to generate a new component.

* - if it returns an error try installing nodemon with 'npm install -g nodemon'

APP LAYOUT:
    JOIN
        play quiz

    HOST
        CREATE QUIZ
            QUIZ BUILDER (2-4 answers, text box)
            SAVE (download)
            UPLOAD (edit existing quiz)
            BACK

        START ROOM
            UPLOAD (quiz, pdf, img - on upload remove previous file)
                quiz (interactive with guests, show statistics to admin)
                files (toggle draw (free, line, arrow, square, highlight, undo, clear))
            SEND QUESTION (sends single question to see how clear the current topic is)
            UNCLEAR (for student to signal to the teacher that they might have a question)
            EXIT (stop/leave room)
    BACK

TO-DO:
video lag fix
crop stream to div size
on new upload -> clear timeout
kaj z image? a se rabi? -> lahko ostane podprto ampak se zdruzi z send-file (case jpeg/png)

risanje -> prvi dot (arrows?)

kviz za guest -> če ni admin potem naredi formo iz prejetega kviza (in pošlji odgovore)
v room dodaj pošiljanje posameznega vprašanja (in statistiko odgovorov, samo za admina)

stili

IMPROVEMENTS:
boljša rešitev za cors kot cors origin * (ni varno)
upload in fileDisplay -> ne samo pdf/img ampak tudi ppt/odt/word (ipd.)
shranjevanje vseh naloženih datotek v temp dir, ki je prikazan kot quick select ob strani
stream -> start/pause/continue/end
risanje -> text field