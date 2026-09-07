import { defineField, defineType } from "sanity";

// This is what the client sees and fills in when they click "New Project"
// in the Studio. Field order here = field order in the editing form.
export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "Residential" },
          { title: "Commercial", value: "Commercial" },
          { title: "Renovation", value: "Renovation" },
          { title: "Concrete & Civil", value: "Concrete & Civil" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "Completed" },
          { title: "In Progress", value: "In Progress" },
        ],
        layout: "radio",
      },
      initialValue: "Completed",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "e.g. Lekki, Lagos",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Photo",
      description: "The main photo shown on the Projects grid and homepage.",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "beforeImage",
      title: "Before Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duringImage",
      title: "During Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "afterImage",
      title: "After Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      description: "Lower numbers show first. Leave blank to sort by newest.",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "coverImage" },
  },
});
