class System {
    constructor() {
        console.log("Initializing System...");

        this.ui_container = document.getElementById("os");

        this.ui_container.innerHTML = `
            <div id='terminal-container'></div>
        `;

        new Terminal();

    }
}

const system = new System();