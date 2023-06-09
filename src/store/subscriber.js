import store from "@/store";
import axios from 'axios';

store.subscribe((mutation)=>{
    switch(mutation.type){
        case 'auth/SET_TOKEN':
            if(mutation.payload){
                // console.log(mutation.payload)
                axios.defaults.headers.common['Authorization']=`Bearer ${mutation.payload}`
                localStorage.setItem('access_token',mutation.payload)
            }else{
                axios.defaults.headers.common['Authorization']=null
                localStorage.removeItem('access_token')
            }
            break;
    }
})