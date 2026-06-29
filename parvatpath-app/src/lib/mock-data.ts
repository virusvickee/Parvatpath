// We keep only the TypeScript types/interfaces if needed elsewhere,
// but the user wants to remove all mock data.
// We'll export empty arrays so compilation doesn't break if there are unresolved references,
// or we can remove the mock data completely. Let's make them empty arrays.

import { Trek, Blog, Testimonial, Tour } from '../types';

export const MOCK_TREKS: Trek[] = [];
export const MOCK_BLOGS: Blog[] = [];
export const MOCK_TESTIMONIALS: Testimonial[] = [];
export const MOCK_TOURS: Tour[] = [];
