import { type SchemaTypeDefinition } from 'sanity';

// Import schema files
import post from './post';
import author from './author';
import category from './category';
import blockContent from './blockContent';
import comment from './comment';

// Define and export the schema
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent, comment],  // Add your schemas here
};
