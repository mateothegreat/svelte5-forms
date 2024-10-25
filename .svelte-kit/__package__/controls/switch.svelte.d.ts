import { Switch } from "bits-ui";
import { type Snippet } from "svelte";
import type { Instance } from "..";
declare const Switch: import("svelte").Component<{
    form: Instance<any>;
    name: string;
    placeholder?: string;
    value?: any;
    class?: string;
    type?: string;
    children?: Snippet;
}, {}, "">;
export default Switch;
