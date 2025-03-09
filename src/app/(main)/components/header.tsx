import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Logo } from "@/components/logo";

import { SignnedIn } from "@/modules/auth/components/signned-in";
import { SignnedOut } from "@/modules/auth/components/signned-out";

export const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[#fffefc]">
      <nav className="flex items-center justify-between h-[3.5rem] p-4">
        <Logo.Text />
        <SignnedIn>
          User button
        </SignnedIn>
        <SignnedOut>
          <div className="flex items-center space-x-4">
            <Button size="sm" variant="ghost" className="text-primary hover:text-primary" asChild>
              <Link href="/sign-in">
                Sign In
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/request">
                Get Jotion Free
              </Link>
            </Button>
        </div>
        </SignnedOut>
      </nav>
    </header>
  );
}