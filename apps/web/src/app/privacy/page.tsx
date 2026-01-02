import { Metadata } from "next";
import { Footer } from "@panta/ui/src/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Panta",
  description: "Privacy policy for Panta LLC",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16 sm:px-8 lg:px-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="mb-4">
            At Panta, we respect your privacy and are committed to protecting your personal data.
            This privacy policy explains how we collect, use, and safeguard your information when
            you visit our website or use our services.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p className="mb-4">
            We may collect information that you provide directly to us, such as when you fill out
            a contact form, schedule a call, or communicate with us. This may include your name,
            email address, phone number, and any other information you choose to provide.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to respond to your inquiries, provide our services,
            improve our website, and communicate with you about our services.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal
            data against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy, please contact us through our
            website contact form or email.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

