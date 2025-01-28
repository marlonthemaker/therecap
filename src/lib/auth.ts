// import { auth } from '@/lib/firebase'
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from 'firebase/auth'

// export const signUpWithEmail = async (email: string, password: string) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password)
//   } catch (error: any) {
//     console.error('Error creating user:', error)
//     throw error // Re-throw to handle in component
//   }
// }

// export const signInWithEmail = async (email: string, password: string) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password)
//   } catch (error: any) {
//     console.error('Error signing in:', error)
//     throw error
//   }
// }

// export const signInWithGoogle = async () => {
//   try {
//     const provider = new GoogleAuthProvider()
//     await signInWithPopup(auth, provider)
//   } catch (error: any) {
//     console.error('Error with google sign in:', error)
//     throw error
//   }
// }

// export const resetPassword = async (email: string) => {
//   try {
//     await sendPasswordResetEmail(auth, email)
//   } catch (error: any) {
//     console.error('error reseting password:', error)
//     throw error
//   }
// }

// export const logOut = async () => {
//   try {
//     await signOut(auth)
//   } catch (error: any) {
//     console.error('error logging out', error)
//     throw error
//   }
// }
