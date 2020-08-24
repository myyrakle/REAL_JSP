declare namespace JSP {
    export function start();
    export function init();

    export let port: integer;
    export let PUBLIC_PATH: string;
    export let PAGE_PATH: string;
}

export = JSP;
