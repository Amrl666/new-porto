import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string'
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string'
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',  
      type: 'date'
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      description: 'Leave empty if this is still ongoing',
      type: 'date'
    }),
    defineField({
      name: 'workType',
      title: 'Work Type',
      type: 'string',
      options: {
        list: [
          { title: 'WFO (Work From Office)', value: 'WFO' },
          { title: 'WFA (Work From Anywhere)', value: 'WFA' },
          { title: 'Freelance', value: 'Freelance' },
          { title: 'Remote', value: 'Remote' },
          { title: 'Hybrid', value: 'Hybrid' }
        ]
      }
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string'
    })
  ],
  preview: {
    select: {
      title: 'company',
      subtitle: 'position'
    }
  }
})
