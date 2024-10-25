import { type Snippet } from "svelte";
import type { Control, Instance } from "./types";
declare class __sveltets_Render<T> {
    props(): {
        form: Instance<T>;
        controls: Control<T_1>[];
        class?: string;
        children: Snippet;
    };
    events(): {};
    slots(): {};
    bindings(): "form";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Root: $$IsomorphicComponent;
type Root<T> = InstanceType<typeof Root<T>>;
export default Root;
