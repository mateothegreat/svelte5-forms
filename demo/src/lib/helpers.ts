import { ControlType } from "$lib/control.svelte";

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomBoolean(): boolean {
  return Math.random() > 0.5;
}

export function randomString(length: number): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

export function getRandomControlType(): ControlType {
  return Object.values(ControlType)[random(0, Object.values(ControlType).length - 1)];
}
