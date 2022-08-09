import { api } from "./api";

export const signInRequest = async (data) => {
    return api.post('/signIn',data)
}

export const signUpRequest = async (data) => {
    return api.post('/signUp',data)
}