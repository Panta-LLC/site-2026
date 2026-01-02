import { Metadata } from "next";
import { Footer } from "@panta/ui/src/sections/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Panta",
  description: "Terms of service for Panta LLC",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16 sm:px-8 lg:px-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="mb-4">
            Please read these terms of service carefully before using our website or services.
            By accessing or using our services, you agree to be bound by these terms.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Services</h2>
          <p className="mb-4">
            Panta provides technology consulting, product development, and media production
            services. The specific terms of any engagement will be outlined in a separate
            agreement or statement of work.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Use of Services</h2>
          <p className="mb-4">
            You agree to use our services only for lawful purposes and in accordance with these
            terms. You are responsible for ensuring that any information you provide is accurate
            and complete.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
          <p className="mb-4">
            All content, features, and functionality of our website and services are owned by Panta
            or its licensors and are protected by copyright, trademark, and other intellectual
            property laws.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
          <p className="mb-4">
            To the fullest extent permitted by law, Panta shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising out of or relating to
            your use of our services.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these terms, please contact us through our website
            contact form or email.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

