import { createRouter, createWebHashHistory } from 'vue-router'

const Alice = () => import("./Alice.vue")
const Bob = () => import("./Bob.vue")
const PAP = () => import("./PAP.vue")

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: "Alice",
            path: "/",
            component: Alice
        },
        {
            name: "Bob",
            path: "/bob",
            component: Bob
        },
        {
            name: "P@P",
            path: "/pap",
            component: PAP
        }
    ]
})
