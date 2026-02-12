'use client'

import { useState, useTransition } from "react"
import Link from "next/link"
import { signup } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignupPage() {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    async function handleSubmit(formData: FormData) {
        setError(null)
        startTransition(async () => {
            const result = await signup(formData)
            if (result?.error) {
                if (result.error.includes("rate limit")) {
                    setError("Email rate limit exceeded. Please wait 15 minutes or use a different email address.")
                } else {
                    setError(result.error)
                }
            }
        })
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                    Create an account to start managing your Instagram business.
                </CardDescription>
            </CardHeader>
            <form action={handleSubmit}>
                <CardContent className="grid gap-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input id="businessName" name="businessName" placeholder="My Awesome Shop" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="instagramHandle">Instagram Handle</Label>
                        <Input id="instagramHandle" name="instagramHandle" placeholder="@myawesomeshop" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full" disabled={isPending}>
                        {isPending ? "Creating account..." : "Create account"}
                    </Button>
                    <div className="mt-2 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}
