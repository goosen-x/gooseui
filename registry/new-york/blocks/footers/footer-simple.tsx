import { Github, Twitter } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
]

const navLinks = [
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
  { label: "Contact", href: "#contact" },
]

export function FooterSimple() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        {/* Copyright */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
            B
          </div>
          <span>&copy; {new Date().getFullYear()} Brand. All rights reserved.</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <social.icon className="h-5 w-5" />
              <span className="sr-only">{social.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
