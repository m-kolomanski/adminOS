class Terminal {
    constructor() {
        console.log("Initializing terminal...")

        this.termial_container = document.getElementById("terminal-container");
        
        this.termial_container.innerHTML = `
            <div id = "terminal-history"></div>
            <div id = "terminal-input-container">
                <div id = "username"></div>
                <input id = "terminal-input" type = "text"></input>
            </div>
            
        `;

        this.terminal_history = document.getElementById("terminal-history");
        this.terminal_input = document.getElementById("terminal-input");
        this.terminal_username = document.getElementById("username");

        this.setupEvents();
    }
    /**
     * @method setupEvents
     * @description Sets up events so the terminal works as it should :)
     */
    setupEvents() {
        // add command to command history //
        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                const command = this.terminal_input.value;
                this.terminal_input.value = "";
                this.log(command, "command");
            } 
        });
    }
    /**
     * @method log
     * @description Adds a typed command to the terminal history display
     * @param {string} command Command to be added to the terminal history.
     * @param {string} level   Level of the terminal log.
     */
    log(message, level = "none") {
        const line = document.createElement("p");
        line.classList.add("terminal-line");

        if (level === "command") {
            line.innerHTML = this.#parseUserName();
        }

        line.appendChild(document.createTextNode(message));

        this.terminal_history.appendChild(line);
    }
    /**
     * @method setUserName
     * @description Sets user name for the current terminal
     * @param {string} username Username
     * @param {string} host     Host
     */
    setUserName(username, host) {
        this.username = username;
        this.host = host;
        this.terminal_username.innerHTML = this.#parseUserName();
    }
    /**
     * @method parseUserName
     * @description Parses user name and host, returns nicely formatted string.
     * @returns Parsed username and host for the use in terminal history or username display.
     */
    #parseUserName() {
        return `<span class='username'>${this.username}</span>@<span class='host'>${this.host}</span>::`
    }
}