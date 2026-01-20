import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Vietnam Insider",
  description: "Terms and conditions for using Vietnam Insider travel website.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>

        <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

        <div className="prose prose-lg max-w-none text-gray-700">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing Vietnam Insider, you agree to be bound by these Terms
            of Service. If you disagree with any part of the terms, you may not
            access the site.
          </p>

          <h2>Use of Our Content</h2>
          <p>
            All content on Vietnam Insider (text, images, graphics, logos) is
            owned by us or our licensors and protected by copyright law.
          </p>
          <p>You may:</p>
          <ul>
            <li>View and read our content for personal, non-commercial use</li>
            <li>Share links to our content on social media</li>
            <li>Quote brief excerpts with proper attribution</li>
          </ul>
          <p>You may not:</p>
          <ul>
            <li>Reproduce, distribute, or republish our content without permission</li>
            <li>Use our content for commercial purposes</li>
            <li>Scrape or automatically collect our content</li>
            <li>Remove any copyright or proprietary notices</li>
          </ul>

          <h2>Disclaimer</h2>
          <p>
            The information on Vietnam Insider is provided for general
            informational purposes only. While we strive for accuracy, we make
            no warranties about the completeness, reliability, or accuracy of
            this information.
          </p>
          <p>
            Travel conditions change frequently. Always verify current
            requirements (visas, health regulations, etc.) with official sources
            before your trip.
          </p>

          <h2>Affiliate Links</h2>
          <p>
            Our site contains affiliate links. When you make purchases through
            these links, we may earn a commission. This does not affect the
            price you pay. See our{" "}
            <a href="/legal/disclosure" className="text-emerald-600">
              Affiliate Disclosure
            </a>{" "}
            for details.
          </p>

          <h2>External Links</h2>
          <p>
            Our site may contain links to external websites. We are not
            responsible for the content or practices of these sites. Linking
            does not imply endorsement.
          </p>

          <h2>User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our site for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper functioning of our site</li>
            <li>Transmit malware or malicious code</li>
            <li>Harass or harm other users</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            Vietnam Insider shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages resulting from your use
            of, or inability to use, our site.
          </p>
          <p>
            We are not responsible for any loss or damage arising from:
          </p>
          <ul>
            <li>Reliance on information provided on our site</li>
            <li>Travel decisions made based on our content</li>
            <li>Third-party services linked from our site</li>
          </ul>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Vietnam Insider from any
            claims, damages, or expenses arising from your use of our site or
            violation of these terms.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be posted on this page. Continued use of the site after changes
            constitutes acceptance of new terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with
            applicable law, without regard to conflict of law principles.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact us at:{" "}
            <a href="mailto:legal@vietnaminsider.com" className="text-emerald-600">
              legal@vietnaminsider.com
            </a>
          </p>
        </div>
      </article>
    </div>
  );
}
