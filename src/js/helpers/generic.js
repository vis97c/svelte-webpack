// export function funInStore(name) {
//     return [
//         'Store',
//         'FullPagination',
//         'Category',
//         'CategoryPagination',
//         'ProductModal',
//         'Search',
//         'SearchPagination'
//     ].includes(name)
// }
export function loadView(view) {
    return () => import(/* webpackChunkName: "view_[request]" */ `_src/js/views/${view}.svelte`)
}
// loadView('_vista')
// export function loadComponent(component) {
//     return () => import(/* webpackChunkName: "component-[request]" */ `_src/js/${component}.vue`)
// }