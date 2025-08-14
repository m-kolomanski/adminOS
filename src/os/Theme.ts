/**
 * Theme class for managing and injecting CSS variables and styles for the adminOS UI.
 */
export class Theme {
  /**
   * Creates and injects the system style element into the document head.
   */
  constructor() {
    const head = document.querySelector("head")!;
    const system_style = document.createElement("style");
    system_style.id = "system-style";

    system_style.innerHTML = `
      :root {
        --bg-color: #0d1117;
        --text-base: #e6edf3;
        --text-fade: #7d8590;
        --text-warning: #f0883e;
        --text-error: #f85149;
      }

      body {
        background-color: var(--bg-color);
        color: var(--text-base);
      }

      #terminal-container {
        width: 100%;
        height: 96vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        span.terminal-username {
          height: 1.5rem;
          margin-right: 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        span.terminal-username:after {
          content: ">";
          margin-left: 0.5rem;
        }

        #terminal-input-container {
          height: min-content;
          width: 100%;
          display: grid;
          grid-template-columns: auto 1fr;
          margin-top: 0.5rem;

          input {
            font-size: 1rem;
            height: 2rem;
            background-color: var(--bg-color);
            color: var(--text-base);
            outline: none;
            box-shadow: none;
            border: none;
          }

          input:focus {
            outline: none;
            box-shadow: none;
            border: none;
          }
          
          span.terminal-username {
            height: 2rem;
          }
        }
        
        #terminal-output {
          p.terminal-line {
            margin: 0;
            height: 1.25rem;
            display: grid;
            grid-template-columns: auto 1fr;

            &:has(span.terminal-command) {
              margin-bottom: 0.5em;
              margin-top: 0.5em;
            }

            span {
              display: flex;
              justify-content: left;
              align-items: center;
            }
            
            span.terminal-command {
              color: var(--text-fade);
            }

            span.terminal-log {
              color: var(--text-fade);
            }

            span.terminal-warning {
              color: var(--text-warning);
            }

            span.terminal-error {
              color: var(--text-error);
            }
          }
        }
      }
    `;

    head.appendChild(system_style)
  }
}