import { loadView } from '_helpers/generic';
// import Home from './_home.svelte'
// import Studios from './_studios.svelte'

const routes = [
    {
        name: '/',
        component: loadView('_home')
    },
    {
        name: '/estudios',
        component: loadView('_studios'),
        // layout: PublicLayout
    },
    // {
    //     name: 'admin',
    //     component: AdminLayout,
    //     onlyIf: { guard: userIsAdmin, redirect: '/login' },
    //     nestedRoutes: [
    //         { name: 'index', component: AdminIndex },
    //         {
    //             name: 'employees',
    //             component: '',
    //             nestedRoutes: [{ name: 'index', component: EmployeesIndex }, { name: 'show/:id', component: EmployeesShow }]
    //         }
    //     ]
    // }
]

export { routes }