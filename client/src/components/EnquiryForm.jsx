import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, CircleAlert, LoaderCircle, Mail, MessageCircle, Phone } from 'lucide-react';
import { services } from '../data/services.js';
import { site, phoneHref, emailHref, whatsappHref } from '../data/site.js';

// Empty in development (Vite proxies /api). Set VITE_API_URL for production if the API is on another domain.
const API_URL = import.meta.env.VITE_API_URL || '';

// These lists must match server/src/utils/validateContact.js
const LOCATIONS = ['Noida', 'Gurugram', 'Faridabad', 'Other'];
const STAGES = ['Planning', 'Plot ready', 'Construction in progress', 'Interiors needed', 'Other'];
const BUDGETS = [
  'Under ₹25 lakh',
  '₹25 – 50 lakh',
  '₹50 lakh – 1 crore',
  'Above ₹1 crore',
  'Prefer to discuss',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;

const REQUIRED_FIELDS = ['name', 'phone', 'email', 'service', 'location', 'details', 'privacy'];

const initialValues = {
  name: '',
  phone: '',
  email: '',
  service: '',
  location: '',
  stage: '',
  budget: '',
  details: '',
  privacy: false,
  website: '', // honeypot, real visitors never fill this in
};

function validateField(name, values) {
  const v = values[name];
  switch (name) {
    case 'name':
      return v.trim().length >= 2 ? '' : 'Please enter your full name';
    case 'phone': {
      const t = v.trim();
      const digits = t.replace(/\D/g, '');
      return PHONE_RE.test(t) && digits.length >= 7 && digits.length <= 15
        ? ''
        : 'Please enter a valid phone number';
    }
    case 'email': {
      const t = v.trim();
      return t === '' || EMAIL_RE.test(t) ? '' : 'Please enter a valid email address';
    }
    case 'service':
      return v ? '' : 'Please select a service';
    case 'location':
      return v ? '' : 'Please select a location';
    case 'details': {
      const len = v.trim().length;
      if (len < 20) return 'Please share at least 20 characters about your project';
      if (len > 2000) return 'Project details must be under 2000 characters';
      return '';
    }
    case 'privacy':
      return v ? '' : 'Please acknowledge the privacy note to continue';
    default:
      return '';
  }
}

const inputCls =
  'w-full min-h-12 rounded-[2px] border border-stone bg-white px-4 py-3 text-base text-charcoal placeholder:text-charcoal/40 transition-colors aria-invalid:border-red-800';

function Field({ name, label, required, error, hint, children }) {
  const id = `enquiry-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {required ? (
          <span className="text-olive-dark" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-charcoal/60"> (optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-red-800">
          <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-charcoal/60">{hint}</p>
      )}
    </div>
  );
}

export default function EnquiryForm({ preset }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [formMessage, setFormMessage] = useState('');
  const [seenNonce, setSeenNonce] = useState(preset.nonce);
  const successRef = useRef(null);

  // When a service CTA is clicked elsewhere on the page, preselect that service.
  if (preset.nonce !== seenNonce) {
    setSeenNonce(preset.nonce);
    if (preset.service) setValues((v) => ({ ...v, service: preset.service }));
    if (status === 'success') setStatus('idle');
  }

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const clearError = (name) =>
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    clearError(name);
  };

  // Validate a field when the visitor leaves it, but only if they typed something.
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') return;
    const msg = validateField(name, { ...values, [name]: value });
    setErrors((prev) => {
      const next = { ...prev };
      if (msg) next[name] = msg;
      else delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return; // prevents duplicate submissions

    const nextErrors = {};
    for (const field of REQUIRED_FIELDS) {
      const msg = validateField(field, values);
      if (msg) nextErrors[field] = msg;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('idle');
      setFormMessage('Please check the highlighted fields and try again.');
      const first = REQUIRED_FIELDS.find((f) => nextErrors[f]);
      document.getElementById(`enquiry-${first}`)?.focus();
      return;
    }

    setErrors({});
    setFormMessage('');
    setStatus('submitting');

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        // Response was not JSON, handled below.
      }

      if (res.ok && data.success) {
        setValues(initialValues);
        setFormMessage(
          data.message ||
            'Thank you for reaching out to Jagni Homes. Your enquiry has been submitted successfully.',
        );
        setStatus('success');
        return;
      }

      // Failure: keep everything the visitor typed.
      if (data.errors) setErrors(data.errors);
      setFormMessage(data.message || 'We could not submit your enquiry right now. Please try again.');
      setStatus('error');
    } catch {
      setFormMessage('We could not reach the server. Please check your connection and try again.');
      setStatus('error');
    }
  };

  const fieldProps = (name) => ({
    id: `enquiry-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `enquiry-${name}-error` : undefined,
  });

  const submitting = status === 'submitting';

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-16 md:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading" className="h2 mt-5">
            Discuss Your Project
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/75">
            Share a few details and we will get back to you to talk through your plans. There is no
            obligation to proceed.
          </p>

          <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] font-sans text-olive-dark">
            Helpful to include
          </h3>
          <ul className="mt-4 space-y-2 text-charcoal/80">
            <li>Plot location and approximate size</li>
            <li>Whether you already have drawings</li>
            <li>What you want to build</li>
            <li>How far along you are</li>
            <li>A rough budget, if you have one</li>
          </ul>

          {(phoneHref || emailHref || whatsappHref) && (
            <div className="mt-10 space-y-3 border-t border-stone pt-8">
              {phoneHref && (
                <a href={phoneHref} className="flex items-center gap-3 hover:text-olive-dark">
                  <Phone size={18} aria-hidden="true" /> {site.phone}
                </a>
              )}
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-olive-dark"
                >
                  <MessageCircle size={18} aria-hidden="true" /> WhatsApp
                </a>
              )}
              {emailHref && (
                <a href={emailHref} className="flex items-center gap-3 hover:text-olive-dark">
                  <Mail size={18} aria-hidden="true" /> {site.email}
                </a>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <div className="border border-stone bg-white p-6 md:p-10">
            {status === 'success' ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                className="py-6 focus:outline-none"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-olive-dark text-ivory">
                  <Check size={22} aria-hidden="true" />
                </span>
                <h3 className="h3 mt-6">Enquiry submitted</h3>
                <p className="mt-3 max-w-md leading-relaxed text-charcoal/75">{formMessage}</p>
                <button
                  type="button"
                  className="btn btn-outline mt-8"
                  onClick={() => {
                    setStatus('idle');
                    setFormMessage('');
                  }}
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-busy={submitting} className="relative">
                {/* Honeypot: hidden from people and screen readers */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                {formMessage && (
                  <div
                    role="alert"
                    className="mb-6 flex items-start gap-2 border border-red-800/40 bg-red-50 px-4 py-3 text-sm text-red-900"
                  >
                    <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{formMessage}</span>
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <Field name="name" label="Full name" required error={errors.name}>
                    <input
                      type="text"
                      autoComplete="name"
                      maxLength={100}
                      className={inputCls}
                      {...fieldProps('name')}
                    />
                  </Field>

                  <Field name="phone" label="Phone number" required error={errors.phone}>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={20}
                      className={inputCls}
                      {...fieldProps('phone')}
                    />
                  </Field>

                  <Field name="email" label="Email" error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      className={inputCls}
                      {...fieldProps('email')}
                    />
                  </Field>

                  <Field name="location" label="Project location" required error={errors.location}>
                    <select className={inputCls} {...fieldProps('location')}>
                      <option value="">Select a location</option>
                      {LOCATIONS.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="md:col-span-2">
                    <Field name="service" label="Preferred service" required error={errors.service}>
                      <select className={inputCls} {...fieldProps('service')}>
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.value}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field name="stage" label="Project stage" error={errors.stage}>
                    <select className={inputCls} {...fieldProps('stage')}>
                      <option value="">Select a stage</option>
                      {STAGES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field name="budget" label="Approximate budget" error={errors.budget}>
                    <select className={inputCls} {...fieldProps('budget')}>
                      <option value="">Select a range</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="md:col-span-2">
                    <Field
                      name="details"
                      label="Project details"
                      required
                      error={errors.details}
                      hint={`Tell us about your plot and what you want to build. ${values.details.length}/2000`}
                    >
                      <textarea
                        rows={5}
                        maxLength={2000}
                        className={inputCls}
                        {...fieldProps('details')}
                      />
                    </Field>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-start gap-3 text-sm leading-relaxed">
                      <input
                        type="checkbox"
                        id="enquiry-privacy"
                        name="privacy"
                        checked={values.privacy}
                        onChange={handleChange}
                        aria-invalid={errors.privacy ? 'true' : undefined}
                        aria-describedby={errors.privacy ? 'enquiry-privacy-error' : undefined}
                        className="mt-1 h-5 w-5 shrink-0 accent-olive-dark"
                      />
                      <span>
                        I agree that Jagni Homes may use these details to contact me about my
                        enquiry. <span className="text-olive-dark" aria-hidden="true">*</span>
                      </span>
                    </label>
                    {errors.privacy && (
                      <p
                        id="enquiry-privacy-error"
                        className="mt-1.5 flex items-start gap-1.5 text-sm text-red-800"
                      >
                        <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{errors.privacy}</span>
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary mt-8 w-full sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Enquiry <ArrowRight size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}