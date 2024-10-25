export declare const FORM_MANAGER_KEY: unique symbol;
export declare class Instance<T> {
    controls: Record<string, Control<T>>;
    errors?: Record<string, string[]>;
    get values(): Record<string, T>;
}
export declare let form: Instance<any>;
/**
 * Create a form with an array of controls.
 * @param name - The name of the form.
 * @param controls - An array of controls to be added to the form.
 * @returns Returns a {Form} object.
 */
export declare const createForm: <T>(name: string, controls: Control<any>[]) => Instance<T>;
