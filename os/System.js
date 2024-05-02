var system, terminal;

class System {
    is_admin_logged_in = false

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
        terminal.log("To get basic help use the 'help' command.");
    }
}

system = new System();