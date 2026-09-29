import { TestimonialItem } from "@/lib/types";

export function getTestimonials(): TestimonialItem[] {
  return [
    { quote: "It was a really good experience working with Boris Engineering & Construction Ltd. We were particularly happy with the quality of the work, your professionalism, and how well you communicated with us throughout the project. Everything was handled properly, and we appreciated the effort put into making sure the work was done to a good standard. I would definitely recommend Boris Engineering & Construction Ltd to others because of the quality of your work, reliability, and professionalism. We were very pleased with the overall experience.", 
      pending: false, 
      author: "Heshili Peter" },
    // { quote: "Client testimonial coming soon. Verified feedback from completed projects will be published here.", pending: true },
    // { quote: "Client testimonial coming soon. Verified feedback from completed projects will be published here.", pending: true },
  ];
}
