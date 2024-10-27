import { getContext, setContext } from "svelte";
import type { FormInstance } from "./types";

export class State<T> {
  form: FormInstance<T>;
}

let last: Symbol;

export const createContext = (form: FormInstance<any>): State<any> => {
  const key = Symbol();
  const ctx = new State();
  ctx.form = form;
  setContext(key, ctx);
  last = key;
  return ctx;
};

export const useContext = <T>(): State<T> => {
  const ctx = getContext<State<T>>(last);
  return ctx;
};
