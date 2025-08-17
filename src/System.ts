import { Terminal } from "./os/Terminal";
import { Theme } from "./os/Theme";
import { CommandDetails } from "./os/CommandDetails";

/**
 * Main system class that manages the adminOS components and command handling.
 */
class System{
  public TERMINAL: Terminal;
  public THEME: Theme;
  private registered_commands: Array<string> = new Array();
  private version = "0.1.0"

  /**
   * Initializes the system by creating terminal and theme instances and registering default command handlers.
   */
  constructor() {
    this.TERMINAL = new Terminal();
    this.TERMINAL.setUser("guest");

    this.TERMINAL.log([
      `adminOS v${this.version} initialized.`,
      "Author: @m-kolomanski",
      "",
      "Welcome, guest!",
      "OS has limited functionality. Please log in to gain access to advanced features."
    ]);

    this.registerHandlers();

    this.THEME = new Theme();
  }

  /**
   * @method registerCommandHandler
   * Registers a command handler for the given command name.
   * @param {string} name - The command name to register
   * @param {Function} handler - The function to handle the command
   * @throws {Error} When a command with the same name is already registered
   */
  public registerCommandHandler(name: string, handler: Function): void {
    if (this.registered_commands.includes(name)) {
      throw new Error(`Plugin conflict detected, failed to register '${name}' command handler.`);
    }

    this.registered_commands.push(name);

    document.addEventListener(name, (event: Event) => {
      const custom_event = event as CustomEvent;
      handler(custom_event.detail);
    });
  }

  /**
   * @method getRegisteredCommands
   * Returns an array of all registered command names.
   * @returns Array of registered command names
   */
  public getRegisteredCommands(): Array<string> {
    return this.registered_commands;
  }

  /**
   * @method dispatchEvent
   * Dispatches event for a given command.
   */
  public dispatchEvent(command: string, detail: CommandDetails): void {
    document.dispatchEvent(new CustomEvent(command, {
      bubbles: true,
      detail: detail
    }));
  }

  /**
   * @method registerHandlers
   * Registers default system command handlers.
   */
  private registerHandlers(): void {
    this.registerCommandHandler("help", this.handleHelpCall.bind(this));
  }

  /**
   * @method handleHelpCall
   * Handles the 'help' command execution.
   * @param detail - Command details/arguments
   */
  private handleHelpCall(detail: CommandDetails): void {
    const invalid_usage = Object.keys(detail.input).length !== 1 ||
      !Object.keys(detail.input).includes("command");

    if (invalid_usage) {
      this.TERMINAL.log([
        "Responsible for displaying help / manual info for given command.",
        "Usage:",
        "help command=<command_name>",
      ]);
      return;
    }

    if (!this.registered_commands.includes(detail.input.command)) {
      this.TERMINAL.error(`Command not found: ${detail.input.command}`);
      return;
    }

    this.dispatchEvent(detail.input.command, {input: {}, flags: ["help"]});
  }
};

(window as any).SYSTEM = new System();
