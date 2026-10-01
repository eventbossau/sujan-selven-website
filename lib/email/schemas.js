import { z } from 'zod';

const honeypot = z.string().optional().default('');

const contactTypeLabels = {
  general: 'General enquiry',
  issue: 'Local issue',
  volunteer: 'Volunteering',
  media: 'Media',
};

export const contactSchema = z.object({
  type: z.enum(['general', 'issue', 'volunteer', 'media']),
  name: z.string().trim().min(1, 'Enter your name').max(120),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().max(40).optional().default(''),
  suburb: z.string().trim().max(80).optional().default(''),
  message: z.string().trim().min(1, 'Tell us how we can help').max(5000),
  updates: z.boolean().optional().default(false),
  company: honeypot,
});

export const getInvolvedSchema = z.object({
  firstName: z.string().trim().min(1, 'Enter your first name').max(80),
  lastName: z.string().trim().min(1, 'Enter your last name').max(80),
  email: z.string().trim().email('Enter a valid email address'),
  mobile: z.string().trim().max(40).optional().default(''),
  postcode: z
    .string()
    .trim()
    .min(1, 'Enter your postcode')
    .max(12)
    .regex(/^\d{4}$/, 'Enter a valid Australian postcode'),
  help: z.enum([
    'Volunteer at events',
    'Doorknocking',
    'Phone calls',
    'Share a skill',
    'Just keep me updated',
  ]),
  updates: z.boolean().optional().default(true),
  company: honeypot,
});

export function contactTypeLabel(type) {
  return contactTypeLabels[type] || type;
}

export { contactTypeLabels };
