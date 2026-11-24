"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/gooseui/ui/otp-input"

export default function CardPreview() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 p-3">
      <InputOTP
        maxLength={4}
        defaultValue="48"
        aria-label="Verification code"
        tabIndex={-1}
      >
        <InputOTPGroup>
          {Array.from({ length: 4 }, (_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p className="text-xs text-muted-foreground">Enter verification code</p>
    </div>
  )
}
