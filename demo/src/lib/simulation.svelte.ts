import type { Control, Form } from "@mateothegreat/svelte5-forms";
import { validators } from "@mateothegreat/svelte5-forms";

import { getRandomControlType, random, randomBoolean, randomString } from "./helpers";

let simulation = $state({
  running: true,
  maxControls: 100,
  add: null, // setIntervals
  value: null, // setIntervals
  disable: null, // setIntervals
  remove: null // setIntervals
});

/**
 *  Surface an accessor for the simulation $state so that
 *  we can use it in the app.svelte, etc.
 */
export const get = () => simulation;

export const update = (prop: keyof typeof simulation, value: (typeof simulation)[keyof typeof simulation]) => {
  simulation = { ...simulation, [prop]: value };
};

export const getProbability = (form: Form) => {
  return Math.max(0.2, 1 - form.controls.size / simulation.maxControls);
};

export const start = (
  form: Form,
  config?: {
    values: boolean;
    create: boolean;
    remove: boolean;
    disable: boolean;
    interval: number;
    initial?: number;
    maxControls: number;
    update: number;
  }
) => {
  if (!config) {
    config = {
      values: true,
      create: true,
      remove: true,
      disable: true,
      interval: 100,
      initial: 100,
      maxControls: 100,
      update: 100
    };
  }

  console.log("start", config, form.controls.size < simulation.maxControls);

  if (config.initial) {
    for (let i = 0; i < config.initial; i++) {
      form.add({
        name: randomString(10),
        type: getRandomControlType(),
        group: "group-1",
        validators: [validators.between(2000, 5000)]
      });
    }
  }

  if (config.create) {
    update(
      "add",
      setInterval(() => {
        if (Math.random() < getProbability(form) && form.controls.size < simulation.maxControls) {
          form.add({
            name: randomString(10),
            type: getRandomControlType(),
            group: "group-1",
            validators: [validators.between(2000, 5000)]
          });
        }
      }, config.interval)
    );
  }

  if (config.remove) {
    update(
      "remove",
      setInterval(() => {
        const controls = form.controls.items();
        const randomControl = form.controls.items().filter((control) => !control.props?.protected)[random(0, controls.length - 1)];
        if (randomControl) {
          form.controls.remove(randomControl.name);
        }
      }, config.interval * 3)
    );
  }

  if (config.values) {
    update(
      "value",
      setInterval(() => {
        const controls = form.controls.items();
        if (controls.length > 0) {
          for (let i = 0; i < config.update; i++) {
            const randomControl = controls[random(0, controls.length - 1)];
            if (randomControl) {
              randomControl.value = randomBoolean() ? random(0, 10000) : null;
            }
          }
        }
      }, config.interval)
    );
  }

  if (config.disable) {
    update(
      "disable",
      setInterval(() => {
        const controls = form.controls.items();
        if (controls.length > 0) {
          for (let i = 0; i < config.update; i++) {
            const randomControl = controls[random(0, controls.length - 1)];
            if (randomControl) {
              randomControl.disabled = randomBoolean();
            }
          }
        }
      }, config.interval)
    );
  }

  update("running", true);
};

export const stop = (form: Form) => {
  clearInterval(simulation.add);
  clearInterval(simulation.value);
  clearInterval(simulation.disable);
  clearInterval(simulation.remove);
  update("running", false);
};

export const reset = (form: Form) => {
  form.controls.clear();
  stop(form);
};

/**
 * Get a random control.
 */
export const randomControl = (form: Form): Control => {
  const controls = form.controls.items();
  return controls[random(0, controls.length - 1)];
};
