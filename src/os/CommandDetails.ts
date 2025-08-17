/**
 * Interface template for how the command details object should look like.
 */
export interface CommandDetails {
  input: { [key: string]: string };
  flags: Array<string>;
}