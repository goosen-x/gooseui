"use client"

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/registry/new-york/ui/morphing-dialog"

export function MorphingDialogDemo() {
  return (
    <MorphingDialog>
      <MorphingDialogTrigger className="overflow-hidden rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md max-w-xs">
        <MorphingDialogImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt="Mountain landscape"
          className="h-40 w-full rounded-lg"
        />
        <div className="mt-3">
          <MorphingDialogTitle>Swiss Alps</MorphingDialogTitle>
          <MorphingDialogSubtitle>
            Explore the majestic mountains
          </MorphingDialogSubtitle>
        </div>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent className="max-w-xl">
          <MorphingDialogClose />
          <MorphingDialogImage
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
            alt="Mountain landscape"
            className="h-64 w-full rounded-lg"
          />
          <div className="mt-4">
            <MorphingDialogTitle className="text-xl">
              Swiss Alps
            </MorphingDialogTitle>
            <MorphingDialogSubtitle>
              Explore the majestic mountains
            </MorphingDialogSubtitle>
          </div>
          <MorphingDialogDescription>
            The Swiss Alps are a mountain range in Switzerland, forming a
            portion of the Alps. They are located in the Swiss Plateau and the
            Jura Mountains region. The highest peak is the Dufourspitze at 4,634
            meters. The Alps are a popular destination for skiing, hiking, and
            mountaineering.
          </MorphingDialogDescription>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export function MorphingDialogCardDemo() {
  return (
    <MorphingDialog>
      <MorphingDialogTrigger className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md max-w-sm">
        <MorphingDialogImage
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          alt="Profile"
          className="h-16 w-16 rounded-full"
        />
        <div>
          <MorphingDialogTitle>John Doe</MorphingDialogTitle>
          <MorphingDialogSubtitle>Software Engineer</MorphingDialogSubtitle>
        </div>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent>
          <MorphingDialogClose />
          <div className="flex items-start gap-4">
            <MorphingDialogImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
              alt="Profile"
              className="h-24 w-24 rounded-full"
            />
            <div>
              <MorphingDialogTitle className="text-xl">
                John Doe
              </MorphingDialogTitle>
              <MorphingDialogSubtitle>
                Software Engineer at Acme Inc.
              </MorphingDialogSubtitle>
            </div>
          </div>
          <MorphingDialogDescription>
            John is a passionate software engineer with over 10 years of
            experience in building web applications. He specializes in React,
            TypeScript, and Node.js. When not coding, he enjoys hiking and
            photography.
          </MorphingDialogDescription>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
