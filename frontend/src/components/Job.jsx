import React from 'react'
import { Bookmark } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

const Job = () => {
  return (
    <div className="w-full max-w-3xl mx-auto border border-gray-200 rounded-lg p-5 bg-white space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://png.pngtree.com/png-vector/20190304/ourmid/pngtree-growth-business-company-logo-png-image_728232.jpg" />
            <AvatarFallback>JB</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-sm font-semibold">Company Name</h1>
            <p className="text-xs text-muted-foreground">India</p>
            <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="rounded-full">
          <Bookmark className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Job info */}
      <div>
        <h1 className="text-lg font-semibold">Frontend Developer</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Nostrum aliquam rem repellat pariatur itaque eligendi accusamus,
          dignissimos quas quo impedit.
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-muted rounded-full text-sm">12 Positions</span>
        <span className="px-3 py-1 bg-muted rounded-full text-sm">Part Time</span>
        <span className="px-3 py-1 bg-muted rounded-full text-sm">₹24 LPA</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t">
        <Button variant="outline">Details</Button>
        <Button>Save For Later</Button>
      </div>

    </div>
  )
}

export default Job
