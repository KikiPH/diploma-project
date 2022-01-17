SETUP
Run `npm install`. This will install all the required dependencies.
Run `ng serve` to start a dev server (`http://localhost:4200/`).
Run `nodemon server.js` to start the socket listener (run in separate command window).
Run `ng g component component-name` to generate a new component.

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
pošlji pdf -> pošlje sliko trenutnega pri profesorju in celoten pdf, da si lahko učenec sam ogleduje zapiske (checkbox kdaj pošlje cel pdf)
+clear na vsak nov socket.on

kviz za guest -> če ni admin potem naredi formo iz prejetega kviza (in pošlji odgovore)
v room dodaj pošiljanje posameznega vprašanja (in statistiko odgovorov, samo za admina)

TO-DO LATER:
loči/uredi admin/user funkcije v .ts datotekah
risanje po pdf (in prikaz sprememb ostalim, funkcije samo za admina)
stili

EXTRA:
nodemon server.js (npm install -g nodemon), ko bo končan projekt lahko tudi node server.js
cors origin * slaba varnost
samo pdf in img -> ostalo težko prikazati ali pretvoriti v pdf (naj uporabnik pretvori sam eksterno)
                   (ppt - skoraj nemogoče (posebej generira kodo za embedanje), odt - openOffice, libra)