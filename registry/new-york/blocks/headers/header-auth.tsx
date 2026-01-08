"use client"

import { Menu, User, X } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"

const navItems = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Reports", href: "#reports" },
]

interface HeaderAuthProps {
  isLoggedIn?: boolean
  userName?: string
}

export function HeaderAuth({
  isLoggedIn = false,
  userName = "John",
}: HeaderAuthProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            A
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">
            AppName
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground text-muted-foreground cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{userName}</span>
              </div>
              <Button variant="outline" size="sm" className="cursor-pointer">
                Sign out
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" className="cursor-pointer">
                Log in
              </Button>
              <Button className="cursor-pointer">Sign up</Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden border-t overflow-hidden transition-all",
          isOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="container py-4 space-y-4">
          {isLoggedIn && (
            <div className="flex items-center space-x-3 pb-4 border-b">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">View profile</p>
              </div>
            </div>
          )}
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-foreground text-muted-foreground cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col space-y-2 pt-4 border-t">
            {isLoggedIn ? (
              <Button variant="outline" className="w-full cursor-pointer">
                Sign out
              </Button>
            ) : (
              <>
                <Button variant="outline" className="w-full cursor-pointer">
                  Log in
                </Button>
                <Button className="w-full cursor-pointer">Sign up</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
