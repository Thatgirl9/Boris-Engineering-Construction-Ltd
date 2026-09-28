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

    defineField({
      name: "scopeOfWork",
      title: "Scope of Work",
      description: "Shown as a bullet list on the project's detail page.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "stages",
      title: "Construction Stages",
      description:
        "The step-by-step stages of this project (e.g. Planning & Foundation, Structural & Blockwork, Roofing & Finishing, Handover). Drag to reorder — order here is the order shown on the site.",
      type: "array",
      of: [
        {
          type: "object",
          name: "stage",
          fields: [
            defineField({
              name: "title",
              title: "Stage Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Stage Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Additional Photos",
      description:
        "Extra photos beyond Cover/Before/During/After, shown in the project's photo gallery. Click any photo on the site to view it full-size.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "videos",
      title: "Videos",
      description:
        "Optional. Upload short project videos (walkthroughs, drone footage, etc). Keep files reasonably small — this uses Sanity's file storage, not a dedicated video host, so very large 4K files aren't recommended.",
      type: "array",
      of: [
        {
          type: "object",
          name: "projectVideo",
          fields: [
            defineField({
              name: "file",
              title: "Video File",
              type: "file",
              options: { accept: "video/*" },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional short label, e.g. \"Site walkthrough\".",
            }),
          ],
          preview: {
            select: { title: "caption" },
            prepare({ title }) {
              return { title: title || "Video" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Client Testimonials",
      description:
        "Optional. Feedback from the client for this specific project — can be added any time, even after the project is published. Leave empty if there's none yet.",
      type: "array",
      of: [
        {
          type: "object",
          name: "projectTestimonial",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "authorName",
              title: "Client Name",
              type: "string",
              description: "Optional — leave blank to keep the testimonial anonymous.",
            }),
            defineField({
              name: "authorRole",
              title: "Client Role / Title",
              type: "string",
              description: "Optional, e.g. \"Homeowner\" or \"Facilities Manager\".",
            }),
            defineField({
              name: "photo",
              title: "Client Photo",
              type: "image",
              options: { hotspot: true },
              description: "Optional.",
            }),
          ],
          preview: {
            select: { title: "authorName", subtitle: "quote", media: "photo" },
            prepare({ title, subtitle }) {
              return { title: title || "Anonymous", subtitle };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: { title: "title", subtitle: "location", media: "coverImage" },
  },
});
