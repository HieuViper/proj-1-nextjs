import { create } from 'zustand';


export const useLogin = create((set) => ({
    loginForm: false,
    setLoginForm: ( value ) => set((state) => ({ loginForm: value }))
  }));
