/**
 * Use to spawn confirmation dialogs (instead of native confirm())
 */
export abstract class ConfirmationUi {

  /**
   * Displays confirmation dialog and returns promise which resolved when user makes a choice
   */
  public abstract confirm(body: string): Promise<boolean>;
}
