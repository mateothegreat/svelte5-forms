/**
 * A reactive object that can be observed for changes using `$state()`.
 *
 * @category utilities
 */
export class ReactiveObject<T extends object> {
  #state = $state(false);
  #target: T;

  constructor(target: T) {
    this.#target = target;
  }

  #trig() {
    this.#state = !this.#state;
  }

  get<K extends keyof T>(key: K): T[K] {
    this.#state;
    return this.#target[key];
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.#target[key] = value;
    this.#trig();
  }

  delete<K extends keyof T>(key: K): void {
    delete this.#target[key];
    this.#trig();
  }

  clear(): void {
    for (const key in this.#target) {
      delete this.#target[key];
    }
    this.#trig();
  }

  keys(): (keyof T)[] {
    this.#state;
    return Object.keys(this.#target) as (keyof T)[];
  }

  values(): T[keyof T][] {
    this.#state;
    return Object.values(this.#target);
  }

  entries(): [keyof T, T[keyof T]][] {
    this.#state;
    return Object.entries(this.#target) as [keyof T, T[keyof T]][];
  }

  toObject(): T {
    this.#state;
    return { ...this.#target };
  }
}
