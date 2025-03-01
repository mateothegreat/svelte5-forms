import { Control, type ControlConfig } from "./control.svelte";

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
  add(item: ControlConfig): Control {
    if (!item.name) {
      item.name = Math.random().toString(36).substring(2, 15);
    }
    return this.#items.set(item.name, new Control(item)).get(item.name);
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
    return this.#items.delete(name);
  }

  /**
   * Gets a control by name.
   */
  get<T>(name: string): Control<T> {
    return this.#items.get(name);
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
