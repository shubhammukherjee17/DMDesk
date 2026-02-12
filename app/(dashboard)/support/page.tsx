
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function SupportPage() {
    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Support</h1>
            </div>
            <Separator />

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Us</CardTitle>
                        <CardDescription>
                            Have a question or need help? Fill out the form below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="I need help with..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Describe your issue in detail..."
                                className="min-h-[150px]"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Send Message</Button>
                    </CardFooter>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Common Questions</CardTitle>
                            <CardDescription>
                                Check our FAQ before reaching out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold">How do I reset my password?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Go to the login page and click "Forgot Password".
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Can I change my subscription?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Yes, you can upgrade or downgrade at any time in Settings.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Where can I see my invoices?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Invoices are available in the Billing section of Settings.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="font-medium">Email:</span>
                                <span className="text-muted-foreground">support@dmdesk.com</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Phone:</span>
                                <span className="text-muted-foreground">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Hours:</span>
                                <span className="text-muted-foreground">Mon-Fri, 9am - 5pm EST</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
