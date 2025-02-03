import { defineType } from 'sanity';

export default defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 } },
    { name: 'author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'mainImage', type: 'image', title: 'Main Image', options: { hotspot: true } },
    { name: 'categories', type: 'array', title: 'Categories', of: [{ type: 'reference', to: [{ type: 'category' }] }] },
    { name: 'publishedAt', type: 'datetime', title: 'Published At' },
    { name: 'body', type: 'blockContent', title: 'Body' },
  ],
});
