import { CommandDetails } from "./CommandDetails";

declare const SYSTEM: any;

/**
 * Terminal class for managing user input/output and command execution.
 */
export class Terminal {
  private terminal_output: HTMLElement;
  private terminal_input: HTMLInputElement;
  private terminal_username: HTMLElement;
  private username: string = "guest";

  /**
   * Initializes the terminal by creating DOM elements and setting up event listeners.
   */
  constructor() {
    const terminal_container = document.getElementById("terminal-container")!;

    this.terminal_output = document.createElement("div");
    this.terminal_output.id = "terminal-output";

    const terminal_input_container = document.createElement("div");
    terminal_input_container.id = "terminal-input-container";

    this.terminal_username = document.createElement("span");
    this.terminal_username.classList.add("terminal-username");

    this.terminal_input = document.createElement("input");
    this.terminal_input.id = "terminal-input";
    this.terminal_input.type = "text";

    terminal_input_container.appendChild(this.terminal_username);
    terminal_input_container.appendChild(this.terminal_input);

    terminal_container.appendChild(this.terminal_output);
    terminal_container.appendChild(terminal_input_container);


    this.terminal_input.focus();

    document.addEventListener("click", () => {
      this.terminal_input.focus();
    });
    document.addEventListener("keydown", () => {
      this.terminal_input.focus();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const command = this.terminal_input.value;
        this.displayLine(command, "command");
        this.executeCommand(command);
        this.clearInput();
      }
    })
  }

  /**
   * @method log
   * Logs a message or array of messages to the terminal output.
   * @param {string | Array<string>} message - String or array of strings to display
   */
  public log(message: string | Array<string>): void {
    if (typeof message === "string") {
      message = [message];
    }

    message.map(line => this.displayLine(line, "log"));
  }

  /**
   * @method warning
   * Displays a warning message or array of warning messages to the terminal.
   * @param {string | Array<string>} message - String or array of strings to display as warnings
   */
  public warning(message: string | Array<string>): void {
    if (typeof message === "string") {
      message = [message];
    }

    message.map(line => this.displayLine(line, "warning"));
  }

  /**
   * @method error
   * Displays an error message or array of error messages to the terminal.
   * @param {string | Array<string>} message - String or array of strings to display as errors
   */
  public error(message: string | Array<string>): void {
    if (typeof message === "string") {
      message = [message];
    }

    message.map(line => this.displayLine(line, "error"));
  }

  /**
   * @method setUser
   * Sets the terminal username displayed in the prompt.
   * @param {string} username - The username to display
   */
  public setUser(username: string): void {
    this.username = username;
    this.terminal_username.textContent = username;
  }

  /**
   * @method displayLine
   * Creates and displays a line of text in the terminal output.
   * @param {string} line - The text content to display
   * @param {string} level - The type of message (command, log, warning, error)
   */
  private displayLine(line: string, level: string = "command"): void {
    const line_element = document.createElement("p");
    line_element.classList.add("terminal-line");

    const message_span = document.createElement("span");

    switch(level) {
      case "command":
        const username_span = document.createElement("span");
        username_span.classList.add("terminal-username");
        username_span.textContent = this.username;
        line_element.appendChild(username_span)

        message_span.classList.add("terminal-command");
        break;

      case "log":
        message_span.classList.add("terminal-log");
        break;

      case "warning":
        message_span.classList.add("terminal-warning");
        break;

      case "error":
        message_span.classList.add("terminal-error");
        break;
    }
    
    message_span.textContent = line;

    line_element.appendChild(message_span);
    this.terminal_output.appendChild(line_element);
  }

  /**
   * @method executeCommand
   * Executes a command by dispatching a custom event.
   * @param {string} command - The command string to execute
   */
  private executeCommand(command: string): void {
    const command_parts: Array<string> = command.split(" ");
    const command_name: string = command_parts[0];
    const command_details: CommandDetails = this.parseDetails(command_parts.slice(1, command_parts.length));

    if (!SYSTEM.getRegisteredCommands().includes(command_name)) {
      this.error(`Command not found: ${command_name}`);
      return;
    }

    SYSTEM.dispatchEvent(command_name, command_details);
  }

  /**
   * @method parseDetails
   * Parses command details from an array of strings.
   * @param {Array<string>} details - The array of strings to parse
   * @returns {Object<Array<string>>} The parsed command details
   */
  private parseDetails(details: Array<string>): CommandDetails {
    const parsed: CommandDetails = {
      input: {},
      flags: []
    };
    details.forEach(detail => {
      if (detail.startsWith("-")) {
        parsed.flags.push(detail.replace(/^-+/, ""));
      } else {
        const [key, value] = detail.split("=");
        if (key && value) {
          parsed.input[key.trim()] = value.trim();
        }
      }

    });
    return parsed;
  }

  /**
   * @method clearInput
   * Clears the terminal input field.
   */
  private clearInput() {
    this.terminal_input.value = "";
  }
}
