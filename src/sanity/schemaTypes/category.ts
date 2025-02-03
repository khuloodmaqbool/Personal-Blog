import { defineType } from 'sanity';

export default defineType({
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'description', type: 'text', title: 'Description' },
  ],
});
