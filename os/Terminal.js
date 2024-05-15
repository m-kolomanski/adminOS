class Terminal {
    constructor() {
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
                // log to terminal history //
                const command = this.terminal_input.value;
                this.terminal_input.value = "";
                this.command(command);

                // parse command //
                const command_parts = command.split(" ");
                const command_name = command_parts[0];
                const command_details = command_parts.slice(1,command_parts.len);

                // check if command exists //
                if (!system.getCommandHandlersList().includes(command_name)) {
                    this.error(`Command ${command_name} not found`);
                    return;
                }

                // invoke appropriate event //
                document.dispatchEvent(new CustomEvent(command_name, {
                    bubbles: true,
                    detail: command_details
                }));
            } 
        });
    }
    command(message) {
        const command_line = this.#createLine(message, "command");
        command_line.innerHTML = this.#parseUserName() + command_line.innerHTML;
        this.#displayLine(command_line);
    }
    /**
     * @method log
     * @description Adds a typed command to the terminal history display
     * @param {string} command Command to be added to the terminal history.
     */
    log(message) {
        if (typeof message === "string") {
            message = [message];
        }
        message.map(line => {
            this.#displayLine(this.#createLine(line, "log"))
        });
    }
    warning(message) {
        if (typeof message === "string") {
            message = [message];
        }
        message.map(line => {
            this.#displayLine(this.#createLine(line, "warning"))
        });
    } 
    error(message) {
        if (typeof message === "string") {
            message = [message];
        }
        message.map(line => {
            this.#displayLine(this.#createLine(line, "error"))
        });
    }
    #createLine(message, level = "log") {
        const line = document.createElement("p");
        line.classList.add("terminal-line");
        line.classList.add(level);
        line.appendChild(document.createTextNode(message));
        return line;
    }
    #displayLine(message) {
        this.terminal_history.appendChild(message);
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