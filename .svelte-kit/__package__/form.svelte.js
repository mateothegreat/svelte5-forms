import { Instance } from './types';
/**
 * A control object.
 */
class Control {
    name;
    value = $state();
    data;
    displayFn;
    disabled;
    max;
    validators;
    errors = $state({});
}
/**
 * Create a form with an array of controls.
 * @param name - The name of the form.
 * @param controls - An array of controls to be added to the form.
 * @returns Returns a {Form} object.
 */
export const createForm = (controls) => {
    const form = new Instance();
    for (const control of controls) {
        form.controls[control.name] = createControl(control);
    }
    return form;
};
/**
 * Create a control.
 * @param name - The name of the control.
 * @param value - The value of the control.
 * @param props - The properties of the control.
 * @returns Returns a {Control} object.
 */
export const createControl = (config) => {
    const control = new Control();
    Object.assign(control, config);
    return control;
};
