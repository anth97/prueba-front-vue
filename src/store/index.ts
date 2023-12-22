import { createPinia } from 'pinia';
import { defineStore } from 'pinia';

const pinia = createPinia();

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Indpbmdlcmxpb24uY3VscWkiLCJleHAiOjE3MDY5NDIxNjR9.j7_UICJFBvPiHv_bhnoRNprVU_DaML41Vjmd51jcRDI',
    }),
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        getToken() {
            if (this.token == '') return null;
            return this.token;
        },
    },
});


export default pinia;
