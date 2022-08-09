import { api } from "./api";

export const signInRequest = async (data) => {
    return api.post('/signIn',data)
}