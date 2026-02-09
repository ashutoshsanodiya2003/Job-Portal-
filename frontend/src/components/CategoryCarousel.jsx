import React from 'react'
import { Button } from './ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'

const CategoryCarousel = () => {
  const category = [
    'Backend Developer',
    'Frontend Developer',
    'Data Science',
    'Full Stack Developer',
    'Full Stack Developer',
    'Full Stack Developer',
    'Full Stack Developer',
    'Full Stack Developer',
    'Full Stack Developer',
    'Full Stack Developer',
  ]

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4">
      <Carousel className="relative">
        <CarouselContent className="-ml-2">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-auto"
            >
              <Button
                variant="outline"
                className="rounded-full px-6 py-2 text-gray-700 border-gray-300 hover:bg-[#F83002] hover:text-white hover:border-[#F83002] transition"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-10" />
        <CarouselNext className="-right-10" />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
