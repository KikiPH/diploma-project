SETUP
Run `npm install`. This will install all the required dependencies.
Run `ng serve` to start a dev server (`http://localhost:4200/`).
Run `ng g component component-name` to generate a new component.

APP LAYOUT:
    JOIN
        play quiz

    HOST
        CREATE QUIZ
            QUIZ BUILDER (2-4 answers, text box, with image)
            SAVE
            UPLOAD
            BACK

        START ROOM
            UPLOAD (quiz, pdf, ppt, img - on upload remove previous file)
                quiz (interactive with guests, back/forward, show correct)
                files (toggle draw (free, line, arrow, square, highlight, undo, clear))
            EXIT
    BACK


NOW
host redirect to room with admin functions (upload, toggle draw), create quiz separate from menu

BETTER
host redirect to setup page with create quiz, upload (to local temp), start room

dodaj kaksen primer @input?
localstorage -> roomid: [users]

ppt viewer (convert v pdf, vsak slide posebej image?)
draw functions (crta, kvadrat, puscica, prosto, brisi)

enak content za isto sobo (localstorage? - NE kaj ce na 5 strani pdf npr)
quiz forma za guest