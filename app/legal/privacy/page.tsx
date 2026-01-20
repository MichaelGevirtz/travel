import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Vietnam Insider",
  description:
    "Vietnam Insider privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

        <div className="prose prose-lg max-w-none text-gray-700">
          <h2>Introduction</h2>
          <p>
            Vietnam Insider (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is
            committed to protecting your personal information. This policy
            explains how we collect, use, and safeguard your data.
          </p>

          <h2>Information We Collect</h2>
          <h3>Information You Provide</h3>
          <ul>
            <li>Email address (if you subscribe to our newsletter)</li>
            <li>Name and message (if you contact us)</li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
            <li>Device information</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Send newsletter updates (if subscribed)</li>
            <li>Respond to your inquiries</li>
            <li>Analyze site usage to improve content</li>
            <li>Track affiliate link performance</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>

          <h2>Cookies</h2>
          <p>We use cookies for:</p>
          <ul>
            <li>Analytics (Google Analytics)</li>
            <li>Affiliate tracking (Booking.com, Agoda)</li>
            <li>Site functionality and preferences</li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling
            cookies may affect site functionality.
          </p>

          <h2>Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li>
              <strong>Google Analytics</strong> - Website analytics
            </li>
            <li>
              <strong>Booking.com</strong> - Affiliate bookings
            </li>
            <li>
              <strong>Agoda</strong> - Affiliate bookings
            </li>
          </ul>
          <p>
            These services have their own privacy policies. We encourage you to
            review them.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your
            information. However, no internet transmission is 100% secure, and
            we cannot guarantee absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Unsubscribe from our newsletter</li>
            <li>Opt out of analytics tracking</li>
          </ul>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our site is not directed at children under 13. We do not knowingly
            collect information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy periodically. Changes will be posted on
            this page with an updated revision date.
          </p>

          <h2>Contact Us</h2>
          <p>
            For privacy-related questions, contact us at:{" "}
            <a
              href="mailto:privacy@vietnaminsider.com"
              className="text-emerald-600"
            >
              privacy@vietnaminsider.com
            </a>
          </p>
        </div>
      </article>
    </div>
  );
}
