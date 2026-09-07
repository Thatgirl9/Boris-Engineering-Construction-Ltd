"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

// This config powers the embedded Studio at /studio. The client logs in
// there with the Sanity account you invite them to, and gets a simple
// form-based editor for Projects — no code, no file structure to touch.
export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    // Vision lets you run GROQ queries from inside the Studio — useful for
    // developers, safe to leave in for a small site, remove if you'd
    // rather keep the Studio UI minimal for the client.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
