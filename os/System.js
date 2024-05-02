var system, terminal;

class System {
    #is_admin_logged_in = false
    #registered_commands = [];

    constructor() {
        console.log("Initializing System...");

        this.ui_container = document.getElementById("os");

        this.ui_container.innerHTML = `
            <div id='terminal-container'></div>
        `;

        terminal = new Terminal();

        terminal.setUserName("user", "adminOS");

        terminal.log("Hello and welcome to adminOS!");
        terminal.log("You can log in to your admin account using the 'login [username] [password]' command.");
        terminal.log("To get basic help use the 'help system' command.");

        this.#registerCommandHandlers();
    }
    /**
     * @method registerCommandHandler
     * @description Adds event handler to system register. Only handlers registered on the system side will be propagated from the terminal.
     * @param {string}   name        Name of the command to add to the registered events list.
     * @param {function} callback_fn Callback function to be fired when command is invoked by the terminal, must take one argument with event details.
     */
    registerCommandHandler(name, callback_fn) {
        if (this.#registered_commands.includes(name)) {
            throw new Error("Handler for this command already exists.");
        }

        this.#registered_commands.push(name);

        document.addEventListener(name, (event) => {
            callback_fn(event.detail);
        })
    }
    /**
     * @method getCommandHandlersList
     * 
     * @returns An array of registered command handlers. 
     */
    getCommandHandlersList() {
        return this.#registered_commands;
    }
    /**
     * @method registerCommandHandler
     * @description Registers system specific command handlers.
     */
    #registerCommandHandlers() {
        this.registerCommandHandler("help", this.#handleHelpCall.bind(this));
        this.registerCommandHandler("system", this.#handleSystemCall.bind(this));
    }
    /**
     * @method handleHelpCall
     * @param {string} details Must contain the name of the command to call help for.
     */
    #handleHelpCall(details) {
        if (typeof details !== "string") {
            if (details.length !== 1) {
                terminal.log("Invalid structure of help call."); return;
            } else {
                details = details.toString();
            }
        }

        if (!this.#registered_commands.includes(details)) {
            terminal.log(`Command ${details} not found.`); return;
        }

        document.dispatchEvent(new CustomEvent(details, {
            bubbles: true,
            detail: ["--help"]
        }));
    }
    /**
     * 
     * @param {string} details List of commands
     */
    #handleSystemCall(details) {
        console.log(details);
        if (details[0] === "--help") {
            terminal.error("Advanced help for system not implemented yet");
        }
    }
}

system = new System();