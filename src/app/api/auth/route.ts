import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        await signOut(auth)
        return NextResponse.json({ message: "Signed Out" });
    } catch (error: any) {
        console.error("Failed to sign out", error);
       return NextResponse.error()
    }

}