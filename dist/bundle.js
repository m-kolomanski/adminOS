"use strict";(()=>{var r=class{terminal_output;terminal_input;terminal_username;username="guest";constructor(){let e=document.getElementById("terminal-container");this.terminal_output=document.createElement("div"),this.terminal_output.id="terminal-output";let t=document.createElement("div");t.id="terminal-input-container",this.terminal_username=document.createElement("span"),this.terminal_username.classList.add("terminal-username"),this.terminal_input=document.createElement("input"),this.terminal_input.id="terminal-input",this.terminal_input.type="text",t.appendChild(this.terminal_username),t.appendChild(this.terminal_input),e.appendChild(this.terminal_output),e.appendChild(t),this.terminal_input.focus(),document.addEventListener("click",()=>{this.terminal_input.focus()}),document.addEventListener("keydown",()=>{this.terminal_input.focus()}),document.addEventListener("keydown",n=>{if(n.key==="Enter"){let i=this.terminal_input.value;this.displayLine(i,"command"),this.executeCommand(i),this.clearInput()}})}log(e){typeof e=="string"&&(e=[e]),e.map(t=>this.displayLine(t,"log"))}warning(e){typeof e=="string"&&(e=[e]),e.map(t=>this.displayLine(t,"warning"))}error(e){typeof e=="string"&&(e=[e]),e.map(t=>this.displayLine(t,"error"))}setUser(e){this.username=e,this.terminal_username.textContent=e}displayLine(e,t="command"){let n=document.createElement("p");n.classList.add("terminal-line");let i=document.createElement("span");switch(t){case"command":let s=document.createElement("span");s.classList.add("terminal-username"),s.textContent=this.username,n.appendChild(s),i.classList.add("terminal-command");break;case"log":i.classList.add("terminal-log");break;case"warning":i.classList.add("terminal-warning");break;case"error":i.classList.add("terminal-error");break}i.textContent=e,n.appendChild(i),this.terminal_output.appendChild(n)}executeCommand(e){let t=e.split(" "),n=t[0],i=t.slice(1,t.length);if(!SYSTEM.getRegisteredCommands().includes(n)){this.error(`Command not found: ${n}`);return}document.dispatchEvent(new CustomEvent(n,{bubbles:!0,detail:i}))}clearInput(){this.terminal_input.value=""}};var a=class{constructor(){let e=document.querySelector("head"),t=document.createElement("style");t.id="system-style",t.innerHTML=`
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
    `,e.appendChild(t)}};var o=class{TERMINAL;THEME;registered_commands=new Array;version="0.1.0";constructor(){this.TERMINAL=new r,this.TERMINAL.setUser("guest"),this.TERMINAL.log([`adminOS v${this.version} initialized.`,"Author: @m-kolomanski","","Welcome, guest!","OS has limited functionality. Please log in to gain access to advanced features."]),this.registerHandlers(),this.THEME=new a}registerCommandHandler(e,t){if(this.registered_commands.includes(e))throw new Error(`Plugin conflict detected, failed to register '${e}' command handler.`);this.registered_commands.push(e),document.addEventListener(e,n=>{t(n.detail)})}getRegisteredCommands(){return this.registered_commands}registerHandlers(){this.registerCommandHandler("help",this.handleHelpCall.bind(this))}handleHelpCall(e){this.TERMINAL.warning(["No help has been implemented yet"])}};window.SYSTEM=new o;})();
