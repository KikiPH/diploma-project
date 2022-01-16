SETUP
Run `npm install`. This will install all the required dependencies.
Run `ng serve` to start a dev server (`http://localhost:4200/`).
Run `node server.js` to start the socket listener (run in separate command window).
Run `ng g component component-name` to generate a new component.

APP LAYOUT:
    JOIN
        play quiz

    HOST
        CREATE QUIZ
            QUIZ BUILDER (2-4 answers, text box)
            SAVE
            UPLOAD
            BACK

        START ROOM
            UPLOAD (quiz, pdf, ppt, img - on upload remove previous file)
                quiz (interactive with guests, back/forward, show correct)
                files (toggle draw (free, line, arrow, square, highlight, undo, clear))
            EXIT
    BACK

TO-DO:
auto refreshanje serverja, če je sprememba na serverju ~1h (WebDevSimplified)

localStorage mora shranjevati roomId in socketId (odstrani kar ni potrebno) ~2h

pošiljanje pdf -> mogoče naredi screenshot diva (brez pdf viewer orodij) in pošlji vsem ~?h
dovoli samo pdf -> openoffice in libra pretvori v pdf, powerppoint opozori na napačen format ~1h

kviz za guest -> če ni admin potem naredi formo iz prejetega kviza (in pošlji odgovore) ~2h

v room dodaj pošiljanje posameznega vprašanja (in statistiko odgovorov, samo za admina) ~2h

TO-DO LATER:
risanje po pdf (in prikaz sprememb ostalim, funkcije samo za admina) ~?h
stili ~?h
