import { Instance } from './types';
import type { Validator } from './validators/validator';
/**
 * A control object.
 */
declare class Control<T> {
    name: string;
    value?: T;
    data?: T[];
    displayFn?: (item: T) => string;
    disabled?: boolean;
    max?: number;
    validators?: Validator<T>[];
    errors?: Record<string, string[]>;
}
/**
 * Create a form with an array of controls.
 * @param name - The name of the form.
 * @param controls - An array of controls to be added to the form.
 * @returns Returns a {Form} object.
 */
export declare const createForm: <T>(controls: Control<any>[]) => Instance<T>;
/**
 * Create a control.
 * @param name - The name of the control.
 * @param value - The value of the control.
 * @param props - The properties of the control.
 * @returns Returns a {Control} object.
 */
export declare const createControl: <T>(config: Control<T>) => Control<T>;
export {};
