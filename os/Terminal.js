class Terminal {
    constructor() {
        console.log("Initializing terminal...")

        this.termial_container = document.getElementById("terminal-container");
        
        this.termial_container.innerHTML = `
            <div id = "terminal-history"></div>
            <input id = "terminal-input" type = "text"></input>
        `;

        this.terminal_history = document.getElementById("terminal-history");

        this.log("Hello and welcome to adminOS!");
        this.log("You can log in to your admin account using the 'login [username] [password]' command.");
        this.log("To get basic help use the 'help' command.");

        this.terminal_input = document.getElementById("terminal-input");

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
                this.log(command);
            } 
        });
    }
    /**
     * @method log
     * @description Adds a typed command to the terminal history display
     * @param {string} command Command to be added to the terminal history.
     */
    log(message) {
        const line = document.createElement("p");
        line.classList.add("terminal-line");
        line.appendChild(document.createTextNode(message));

        this.terminal_history.appendChild(line);
    }
}