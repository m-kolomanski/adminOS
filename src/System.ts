import { Terminal } from "./os/Terminal";
import { Theme } from "./os/Theme";
import { CommandDetails } from "./os/CommandDetails";

interface OsMetadata {
  name: string;
  version: string;
  release_date: string;
  author: string;
  changelog: string;
  link: string;
  bug_reports: string;
}

/**
 * Main system class that manages the adminOS components and command handling.
 */
class System{
  public TERMINAL: Terminal;
  public THEME: Theme;
  private registered_commands: Array<string> = new Array();
  private os_metadata: OsMetadata = {
    name: "adminOS",
    version: "0.2.0-dev",
    release_date: "the future",
    author: "@m-kolomanski",
    changelog: "https://github.com/m-kolomanski/adminOS/blob/main/CHANGELOG.md",
    link: "https://github.com/m-kolomanski/adminOS",
    bug_reports: "https://github.com/m-kolomanski/adminOS/issues"
  };

  /**
   * Initializes the system by creating terminal and theme instances and registering default command handlers.
   */
  constructor() {
    this.TERMINAL = new Terminal();
    this.TERMINAL.setUser("guest");

    this.TERMINAL.log([
      `adminOS v${this.os_metadata.version} initialized.`,
      `Author: ${this.os_metadata.author}`,
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
    this.registerCommandHandler("system", this.handleSystemCall.bind(this));
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

  /**
   * @method handleSystemCall
   * Handles the 'system' command execution, displaying info about the system.
   * @param detail - Command details/arguments
   */
  private handleSystemCall(detail: CommandDetails): void {
    if (detail.flags.includes("help")) {
      this.TERMINAL.log([
        "Displays information about the adminOS.",
        "You can display specific information by providing the key as a flag:",
        "system -version",
        `${"\u00A0".repeat(14)}-release_date`,
        `${"\u00A0".repeat(14)}-author`,
        `${"\u00A0".repeat(14)}-changelog`,
        `${"\u00A0".repeat(14)}-link`,
        `${"\u00A0".repeat(14)}-bug_reports`,
        "Any input variables are ignored."
      ]);
      return;
    }

    if (detail.flags.length !== 0) {
      const valid_flags = Object.keys(this.os_metadata);
      const invalid_flags = detail.flags.filter(flag => !valid_flags.includes(flag));
      if (invalid_flags.length > 0) {
        this.TERMINAL.error(`Invalid flags: ${invalid_flags.join(", ")}`);
        return;
      }

      const requested_info: Array<string> = detail.flags.map(flag => {
        return `${flag}: ${this.os_metadata[flag as keyof OsMetadata]}`;
      })

      this.TERMINAL.log(requested_info);
      return;
    }

    this.TERMINAL.log([
      `adminOS`,
      `Version: ${this.os_metadata.version}`,
      `Release Date: ${this.os_metadata.release_date}`,
      `Author: ${this.os_metadata.author}`,
      `Changelong: ${this.os_metadata.changelog}`,
      `Link: ${this.os_metadata.link}`,
      `Bug Reports: ${this.os_metadata.bug_reports}`
    ]);
  }
};

(window as any).SYSTEM = new System();
