import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

const JobDescription = () => {
  const isApplied = false

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border p-8 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Frontend Developer</h1>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary">12 Positions</Badge>
            <Badge variant="secondary">Part Time</Badge>
            <Badge variant="secondary">₹24 LPA</Badge>
          </div>
        </div>

        {/* Apply Button */}
        <div className="pt-4 border-t flex justify-end">
          <Button
            disabled={isApplied}
            size="lg"
            variant={isApplied ? "secondary" : "default"}
            className={isApplied ? "cursor-not-allowed" : ""}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        {/* Job Description Section */}
        <div className="border-t pt-6 space-y-4">
          <h2 className="text-lg font-semibold">Job Description</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

            <div>
              <p className="text-muted-foreground">Role</p>
              <p className="font-medium">Frontend Developer</p>
            </div>

            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium">Hyderabad</p>
            </div>

            <div>
              <p className="text-muted-foreground">Experience</p>
              <p className="font-medium">2 Years</p>
            </div>

            <div>
              <p className="text-muted-foreground">Salary</p>
              <p className="font-medium">12 LPA</p>
            </div>

            <div>
              <p className="text-muted-foreground">Total Applicants</p>
              <p className="font-medium">4</p>
            </div>

            <div>
              <p className="text-muted-foreground">Posted Date</p>
              <p className="font-medium">12/02/2026</p>
            </div>

          </div>

          <div>
            <p className="text-muted-foreground text-sm mt-4">Description</p>
            <p className="text-sm leading-relaxed mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, quaerat.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default JobDescription
