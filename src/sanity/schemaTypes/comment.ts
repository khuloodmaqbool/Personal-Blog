import { defineType } from 'sanity';

export default defineType({
  name: 'comment',
  type: 'document',
  title: 'Comment',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required().min(2).max(50),
    },
    {
      name: 'content',
      type: 'text',
      title: 'Content',
      validation: (Rule) => Rule.required().min(5).max(500),
    },
    {
      name: 'approved',
      type: 'boolean',
      title: 'Approved',
      initialValue: false,
    },
    {
      name: 'post',
      type: 'reference',
      to: [{ type: 'post' }],
      title: 'Post',
      validation: (Rule) => Rule.required(),
    },
  ],
});
