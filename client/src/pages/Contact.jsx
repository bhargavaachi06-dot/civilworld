import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, HardHat } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const Contact = () => {
  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b' }}>
            Get In Touch
          </span>
          <h1 className="page-hero-title" style={{ marginBottom: '1rem' }}>Contact CivilWorld</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1' }}>
            Have a construction project in mind or looking to enroll in our practical civil academy? Reach out to our technical team for consultations and inquiries.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '3.5rem', alignItems: 'flex-start' }}>
            {/* Contact Details & Info */}
            <div>
              <span className="badge-tag">Communication Desk</span>
              <h2>Engineering Offices & Site Centers</h2>
              <p style={{ marginBottom: '2rem' }}>
                Our civil engineering consultants and academy instructors are available for scheduled project reviews, BOQ audits, and student admissions counseling.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Corporate Office & Training Center</h4>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>CivilWorld Head Office & Practical Academy Labs (Regional Center Placeholder)</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Email Inquiries</h4>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>
                      <a href="mailto:civilworldtelugu1@gmail.com" style={{ color: '#0f172a', fontWeight: 600, textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.color = '#d97706'} onMouseOut={e => e.currentTarget.style.color = '#0f172a'}>
                        civilworldtelugu1@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Direct Line</h4>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>
                      <a href="tel:7032518399" style={{ color: '#0f172a', fontWeight: 600, textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.color = '#d97706'} onMouseOut={e => e.currentTarget.style.color = '#0f172a'}>
                        +91 7032518399
                      </a>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', flexShrink: 0 }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Working Hours</h4>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>Monday – Saturday: 9:00 AM – 6:30 PM (Sunday Closed for Field Safety Audits)</p>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#f1f5f9', padding: '1.25rem', borderRadius: '10px', fontSize: '0.85rem', color: '#64748b' }}>
                <strong>Prompt Response Assurance:</strong> Construction proposals and academy enrollment inquiries are reviewed by licensed engineers within 24 working hours.
              </div>
            </div>

            {/* Embedded Form */}
            <div>
              <EnquiryForm title="Send a Direct Message" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
