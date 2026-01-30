import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  projectId: 'gdf6dsgi',
  dataset: 'production',
  title: 'Atlas AI Website',
  apiVersion: '2024-01-01',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [
      {
        type: 'document',
        name: 'landingPage',
        title: 'Landing Page',
        fields: [
          {
            type: 'string',
            name: 'title',
            title: 'Page Title',
            validation: (Rule) => Rule.required(),
          },
          {
            type: 'string',
            name: 'description',
            title: 'Meta Description',
          },
          {
            type: 'object',
            name: 'hero',
            title: 'Hero Section',
            fields: [
              {
                type: 'string',
                name: 'headline',
                title: 'Headline',
              },
              {
                type: 'text',
                name: 'subheadline',
                title: 'Subheadline',
              },
              {
                type: 'string',
                name: 'cta',
                title: 'CTA Button Text',
              },
            ],
          },
          {
            type: 'array',
            name: 'services',
            title: 'Services',
            of: [
              {
                type: 'object',
                fields: [
                  { type: 'string', name: 'title', title: 'Title' },
                  { type: 'text', name: 'description', title: 'Description' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'pricing',
            title: 'Pricing Section',
            fields: [
              {
                type: 'string',
                name: 'title',
                title: 'Section Title',
              },
              {
                type: 'array',
                name: 'plans',
                title: 'Pricing Plans',
                of: [
                  {
                    type: 'object',
                    fields: [
                      { type: 'string', name: 'name', title: 'Plan Name' },
                      { type: 'string', name: 'price', title: 'Price' },
                      { type: 'text', name: 'description', title: 'Description' },
                      { type: 'text', name: 'features', title: 'Features' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
})
