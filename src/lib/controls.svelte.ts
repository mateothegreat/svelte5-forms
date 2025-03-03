import { Control, type ControlConfig } from "./control.svelte";
import type { Form, FormState } from "./form";

import { ReactiveMap } from "./utilities/reactive-map.svelte";

export type ContainerItem = {
  name: string;
};

/**
 * A container that manages a collection of controls and provides reactive state management.
 */
export class ControlsContainer {
  #items = new ReactiveMap<string, Control>();

  /**
   * Adds a control to the container.
   * If no name is provided, a random one will be generated.
   */
  add(form: Form, item: ControlConfig): Control {
    if (!item.name) {
      item.name = Math.random().toString(36).substring(2, 15);
    }
    const control = new Control(form, item);
    this.#items.set(item.name, control);
    return control;
  }

  set(name: string, prop: string, value: any): Control {
    const item = this.#items.get(name);
    if (item) {
      this.#items.set(name, item);
      item.value = value;
      return item;
    }
    throw new Error(`control with name ${name} not found`);
  }

  /**
   * Removes a control from the container.
   */
  remove(name: string): boolean {
    const item = this.#items.get(name);
    if (item) {
      // Call delete on the control first
      // item.delete();

      // Then remove from the map:
      return this.#items.delete(name);
    }
    return false;
  }

  /**
   * Gets a control by name.
   */
  get<T>(name: string): Control<T> {
    const item = this.#items.get(name);
    if (!item) {
      throw new Error(`control with name ${name} not found`);
    }
    const derived = $derived(item);
    return derived;
  }

  /**
   * Gets all control values as a record.
   */
  values(): Record<string, any> {
    const values: Record<string, any> = {};
    for (const [name, item] of this.#items) {
      values[name] = item.value;
    }
    return values;
  }

  valuesFor(...props: (keyof Control)[]): Record<string, any> {
    const values: Record<string, any> = {};
    for (const [name, item] of this.#items) {
      values[name] = {};
      props.forEach((prop) => {
        values[name][prop] = item[prop];
      });
    }
    return values;
  }

  state(): FormState {
    const state: FormState = {};
    for (const [name, item] of this.#items) {
      state[name] = {
        value: item.value,
        disabled: item.disabled,
        errors: item.errors,
        pristine: item.pristine,
        valid: item.valid,
        type: item.type
      };
    }
    return state;
  }

  /**
   * Sets values for multiple controls at once.
   */
  setValues(values: Record<string, any>) {
    for (const [name, value] of Object.entries(values)) {
      const item = this.#items.get(name);
      if (item) {
        item.value = value;
      }
    }
  }

  /**
   * Gets all controls.
   */
  items(): Control[] {
    return Array.from(this.#items.values());
  }

  /**
   * Checks if a control exists.
   */
  has(name: string): boolean {
    return this.#items.has(name);
  }

  filter<T>(fn: (item: Control<T>) => boolean): Control<T>[] {
    return Array.from(this.#items.values()).filter(fn);
  }

  /**
   * Gets the number of controls.
   */
  get size(): number {
    return this.#items.size;
  }

  /**
   * Clears all controls.
   */
  clear() {
    this.#items.clear();
  }
}
