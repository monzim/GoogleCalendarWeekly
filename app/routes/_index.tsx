"use client";

import { Link } from "@remix-run/react";
import { Github, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import GoogleCalendarWeekly from "~/components/calendart-weekly";
import { fakeRoutine } from "~/lib/fake";

export default function Index() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4 w-full">
      <div className="w-full max-w-7xl">
        <CardHeader className="flex flex-row items-center justify-center">
          <div>
            <div className="flex items-center justify-center gap-4 mb-3">
              <CardTitle className="text-3xl font-bold text-center">
                Calendar Weekly View
              </CardTitle>
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
            <CardDescription className="text-center">
              An open-source weekly calendar view inspired by Google Calendar.{" "}
              <a
                className="text-xs text-primary"
                href="https://monzim.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Developed by Monzim.
              </a>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="w-full">
          <GoogleCalendarWeekly data={fakeRoutine as any} />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://github.com/monzim.png"
              alt="Monzim"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Developed by Monzim</p>
              <Link
                to="https://monzim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:underline"
              >
                monzim.com
              </Link>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link
                to="https://github.com/monzim/GoogleCalendarWeekly"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  );
}
