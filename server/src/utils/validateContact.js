import { z } from 'zod';

export const SERVICES = [
  'Complete Home Construction',
  'Main Structure & Civil Work',
  'Interior Design & Execution',
  'Drawings, Approvals & Paperwork',
  'End-to-End Project Coordination',
];

export const LOCATIONS = ['Noida', 'Gurugram', 'Faridabad', 'Other'];

export const STAGES = [
  'Planning',
  'Plot ready',
  'Construction in progress',
  'Interiors needed',
  'Other',
];

export const BUDGETS = [
  'Under ₹25 lakh',
  '₹25 – 50 lakh',
  '₹50 lakh – 1 crore',
  'Above ₹1 crore',
  'Prefer to discuss',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;

// Collapse control characters / newlines in single-line fields.
const clean = (v) =>
  typeof v === 'string'
    ? v.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim()
    : v;

const requiredText = (label) =>
  z.string({ error: `${label} is required` }).transform(clean);

const optionalEnum = (values) =>
  z
    .union([z.enum(values), z.literal('')])
    .optional()
    .transform((v) => v || '');

const schema = z.object({
  name: requiredText('Name').pipe(
    z.string().min(2, 'Please enter your full name').max(100, 'Name is too long'),
  ),

  phone: requiredText('Phone number').pipe(
    z
      .string()
      .regex(PHONE_RE, 'Please enter a valid phone number')
      .refine((v) => {
        const digits = v.replace(/\D/g, '');
        return digits.length >= 7 && digits.length <= 15;
      }, 'Please enter a valid phone number'),
  ),

  email: z
    .string()
    .optional()
    .transform((v) => (v || '').trim())
    .pipe(
      z
        .string()
        .max(254, 'Email is too long')
        .refine((v) => v === '' || EMAIL_RE.test(v), 'Please enter a valid email address'),
    ),

  service: z.enum(SERVICES, { error: 'Please select a service' }),
  location: z.enum(LOCATIONS, { error: 'Please select a location' }),
  stage: optionalEnum(STAGES),
  budget: optionalEnum(BUDGETS),

  details: z
    .string({ error: 'Project details are required' })
    .trim()
    .min(20, 'Please share at least 20 characters about your project')
    .max(2000, 'Project details must be under 2000 characters'),

  privacy: z.literal(true, { error: 'Please acknowledge the privacy note to continue' }),

  // Honeypot: real users never fill this in.
  website: z.string().optional(),
});

export function validateContact(body) {
  const result = schema.safeParse(body);

  if (result.success) {
    return { ok: true, data: result.data };
  }

  const errors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] || 'form';
    if (!errors[field]) errors[field] = issue.message;
  }
  return { ok: false, errors };
}