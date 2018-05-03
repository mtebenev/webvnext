/**
 * Use to spawn confirmation dialogs (instead of native confirm())
 */
export abstract class ConfirmationUi {

  /**
   * Displays confirmation dialog and returns promise which resolved when user makes a choice.
   * body: pass plain string or translation ID of a string to display in the dialog body
   */
  public abstract confirm(body: string): Promise<boolean>;
}
