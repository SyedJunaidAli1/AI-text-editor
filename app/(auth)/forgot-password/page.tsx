"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { forgotPassword } from "@/server/user";

export default function page() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await forgotPassword({
        email,
      });
      setLoading(false);
      setMessage("Password reset email sent successfully");
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen px-4">
      <Card className=" w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Forgot Password</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <p>Reset Password</p>
              )}
            </Button>
            {message && <p className="text-center">{message}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
