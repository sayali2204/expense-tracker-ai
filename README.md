Phase 1:  phase one includes the creation of the folder and the files 

Phase 2: this is the phase two of the project which includes creating git repo and initialising it

git init -> command used to initialise git
created a new file named .gitignore -> this files stores all the confidential data of the user that the user do not want to display
git status -> to track the status of our project 
git add . -> used to add al the files to github 
git commit -m "message" -> this commits the files and displays the message that you have provided for tracking purposes
git branch -m main -> this will change your branch from master or the other to main
https://github.com/sayali2204/expense-tracker-ai.git -> this was used to add remote access to the github directory
git push -u origin main -> used to push al the files like the final commit

Phase 3: this includes creation of flask backend

step 1: create 3 files named app.py , database.py and requirements.txt

step 2: create virtual env so that all the lib are present in this env and they do not interfere with the other projects
        cd backend
        python -m venv ve
        ve\Scripts\activate
        Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -> used this cause powershell blocked the files from running due to security reasons 

step 3: Flask setup
        pip install flask flask-cors

        pip freeze > requirements.txt
        pip freeze -> this lists all the python packages currently installed along with their exact versions
        > requirements.txt ->  this is shell redirection i.e it takes output from pip freeze and the saves it in the requirements.txt file 

step 4: Database setup
        This code creates and manages a connection to an SQLite database and ensures an expenses table exists to store expense data safely.

        i am using sqlite3 cause it is in-built python module that requires no external installation. using try catch block to avoid code breaking.
        i have given the name of the db as expenses.db then tried to establish the connection, then created a table named expenses using the cursor.
        finally i have used commit and close to submit the query and then closse the connection.

step 5: Flask setup
        This code builds a complete REST API using Flask that allows creating, reading, updating, and deleting expense records stored in an SQLite database.

        I am importing all the required lib. 
        1] Flask : for web development purpose
        2] requests :  to request the data from the server
        3] jsonify : to convert the fetched data to json format for easier display
        4] CORS : CORS (Cross-Origin Resource Sharing) is a browser security rule that controls whether a web page from one origin is allowed to make requests to another origin.
        5] databse file -> get_conn and create_table 
        6] sqlite3

        then routing for add , delete , search , update is written; all of which involves the use of the db

        lastly to avoid any breakage of the code we are using if __name__ = __main__ then only the app i.e the server should run not when the file is imported as a module

step 6: testing the backend
        we can either use postman or curl which is client url -> It’s a command-line tool that sends HTTP requests to servers
        1]curl sends HTTP request
        2]Flask receives it at /expenses
        3]request.json reads the data
        4]SQL INSERT runs
        5]Data is saved to SQLite
        6]Backend return

        curl -X <HTTP_METHOD> <FULL_URL> \
        -H "<Header-Name>: <value>" \
        -d '<request-body>'
        this is the format of the curl command

        error codes:
        Code	Who is at fault?	Meaning
        200	     Nobody         	Success
        201	     Nobody	            Resource created
        400	     Client	            Bad input
        401	     Client	            Not logged in
        403	     Client	            No permission
        404	     Client	            Wrong URL / ID
        500	     Server	            Backend crashed


        curl for get_expense: curl http://127.0.0.1:5000/get_expense
        curl for add_expense: curl -X POST http://127.0.0.1:5000/add_expense ^
                                   -H "Content-Type: application/json" ^
                                   -d "{\"title\":\"Coffee\",\"amount\":120,\"date\":\"2026-01-28\"}"
        curl for update_expense:curl -X PUT http://127.0.0.1:5000/update_expense/1 ^
                                     -H "Content-Type: application/json" ^
                                     -d "{\"title\":\"Tea\",\"amount\":80,\"date\":\"2026-01-29\"}"
        curl for delete_expense: curl -X DELETE http://127.0.0.1:5000/delete_expense/1

        backend is working properly.

        post means to create something new from the given data.
        put means this particular things already exists just replace or update it.


conclusion of phase 3: phase 3 is completed right now.
        now i am going to push all of my files to github; for that use 
        git add. 
        git commit -m "phase 3 completed" 
        git push 

Phase 4: this phase includes the creation of MCP-SERVER where all the possible actions are listed that the AI can perform.
        mcp-sdk provides the following:
        1]MCP Host
        2]MCP Client
        3]Tool definitions
        4]Schema validation
        5]Secure tool invocation

        I am also using axios -> Axios is a JavaScript library used to make HTTP requests. That means it helps your app talk to other servers.

        axios is used for sending http request to flask backend.
        