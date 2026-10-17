import React from 'react';
import { Mail } from 'lucide-react';

export const socialLinksData = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/civilworldtelugu1?cplk=N2V6MjloZGJubW5y',
    label: 'CivilWorld on Instagram',
    iconType: 'instagram',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/19WyP8KKrC/',
    label: 'CivilWorld on Facebook',
    iconType: 'facebook',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/917032518399',
    label: 'Chat with CivilWorld on WhatsApp',
    iconType: 'whatsapp',
  },
  {
    name: 'Email',
    url: 'mailto:civilworldtelugu1@gmail.com',
    label: 'Email CivilWorld',
    iconType: 'email',
  },
];

export const SocialIcon = ({ type, size = 18 }) => {
  switch (type) {
    case 'instagram':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cw-ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#feda75" />
              <stop offset="25%" stopColor="#fa7e1e" />
              <stop offset="50%" stopColor="#d62976" />
              <stop offset="75%" stopColor="#962fbf" />
              <stop offset="100%" stopColor="#4f5bd5" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#cw-ig-gradient)" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#cw-ig-gradient)" />
          <circle cx="17.5" cy="6.5" r="1.25" fill="url(#cw-ig-gradient)" />
        </svg>
      );
    case 'facebook':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="#1877F2"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="#25D366"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case 'email':
      return <Mail size={size} color="#EA4335" strokeWidth={2} aria-hidden="true" />;
    default:
      return null;
  }
};

export const SocialLinks = ({ theme = 'footer', iconSize = 18, className = '' }) => {
  return (
    <div className={`social-icons-wrap ${className}`} role="list">
      {socialLinksData.map((item) => {
        const isExternal = item.url.startsWith('http');
        return (
          <a
            key={item.name}
            href={item.url}
            className={`social-icon-btn ${theme}-theme social-btn-${item.iconType}`}
            aria-label={item.label}
            title={item.label}
            role="listitem"
            {...(isExternal
              ? {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }
              : {})}
          >
            <SocialIcon type={item.iconType} size={iconSize} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;

