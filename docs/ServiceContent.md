We have 3 service categories:

- Business/Technology Consulting
  - Technical Consulting: We provide technical consulting services to help businesses navigate the complex landscape of modern technology.
  - Media Design: We provide media design services to help businesses create visually appealing and engaging media content.
  - Web Development: We provide web development services to help businesses create and maintain their online presence.

- Product Development
  - Product Development: We provide product development services to help businesses create and launch new products.
  - Product Testing: We provide product testing services to help businesses ensure their products are of high quality and meet the needs of their customers.
- Web Development
  - Web Development: We provide web development services to help businesses create and maintain their online presence.
  - Web Testing: We provide web testing services to help businesses ensure their websites are of high quality and meet the needs of their customers.

---

## Service Category Page Content Structure

Each service category page should follow this structure to provide a comprehensive overview while guiding users to specific services:

### 1. Hero Section

**Purpose:** Immediate visual impact and clear value proposition

**Content:**

- **Heading:** Category name (e.g., "Business & Technology Consulting")
- **Subheading/Description:** 1-2 sentence value proposition that explains what the category offers and why it matters
- **Visual:** Optional background image or gradient that represents the category

**Example for Business/Technology Consulting:**

- Heading: "Business & Technology Consulting"
- Description: "Strategic technology guidance that transforms your business operations and drives growth through expert consulting and implementation support."

---

### 2. Category Overview Section

**Purpose:** Provide context and set expectations

**Content:**

- **Heading:** "About [Category Name]" or "What We Offer"
- **Rich Text Content:** 2-4 paragraphs covering:
  - What the category encompasses
  - Who it's for (target audience)
  - Key benefits and outcomes
  - Why choose this category of services
- **Optional:** Statistics, testimonials, or case study highlights

**Example Structure:**

```
Our Business & Technology Consulting services help organizations navigate complex technology landscapes, make informed decisions, and implement solutions that drive real business value. Whether you're looking to modernize your tech stack, optimize operations, or develop a strategic technology roadmap, our expert consultants provide the guidance and support you need.

We work with businesses of all sizes, from startups to enterprise organizations, helping them leverage technology to achieve their goals. Our approach combines deep technical expertise with business acumen, ensuring that every recommendation aligns with your strategic objectives.
```

---

### 3. Services Grid Section

**Purpose:** Showcase all services within the category

**Content:**

- **Heading:** "Our [Category] Services" or "Services We Offer"
- **Service Previews Component:** Grid display of all services in this category
  - Each service card shows:
    - Service title
    - Brief description (from service.description)
    - "Learn more" link to individual service page
- **Layout:** Responsive grid (1 column mobile, 2-3 columns tablet, 3-4 columns desktop)

**Implementation:** Use existing `ServicePreviews` component filtered by category

---

### 4. Key Benefits/Features Section

**Purpose:** Highlight the value and differentiators of this category

**Content:**

- **Heading:** "Why Choose [Category]?" or "Key Benefits"
- **Features Component:** 3-6 key benefits or features, each with:
  - Icon or visual element (optional)
  - Feature title
  - Brief description (1-2 sentences)
- **Focus Areas:**
  - Expertise and experience
  - Methodology or approach
  - Outcomes and results
  - Unique differentiators

**Example Features for Business/Technology Consulting:**

- "Expert Guidance" - "Our consultants bring years of industry experience and deep technical knowledge to every engagement."
- "Strategic Approach" - "We align technology decisions with your business goals, ensuring every recommendation drives value."
- "End-to-End Support" - "From initial strategy through implementation and beyond, we're with you every step of the way."
- "Proven Results" - "We've helped countless businesses transform their operations and achieve measurable outcomes."

---

### 5. Process/Methodology Section (Optional)

**Purpose:** Explain how you work within this category

**Content:**

- **Heading:** "Our Approach" or "How We Work"
- **Rich Text or Features:** Describe the typical process, phases, or methodology
- **Visual:** Optional process diagram or timeline
- **Content Structure:**
  - Overview of approach
  - Key phases or steps
  - What clients can expect
  - Timeline expectations (if applicable)

**Example:**

```
Our consulting process begins with understanding your unique challenges and goals. We conduct thorough assessments, develop tailored strategies, and work collaboratively with your team to implement solutions. Throughout the engagement, we provide ongoing support and adjust our approach based on your evolving needs.
```

---

### 6. Related Services Section (Optional)

**Purpose:** Cross-promote complementary services from other categories

**Content:**

- **Heading:** "Related Services" or "You May Also Be Interested In"
- **Service Previews Component:** 2-4 services from other categories that complement this one
- **Context:** Brief explanation of why these services are relevant

---

### 7. Call-to-Action Section

**Purpose:** Convert visitors to leads

**Content:**

- **Heading:** "Ready to Get Started?" or "Let's Discuss Your Needs"
- **Description:** Brief, action-oriented text encouraging contact
- **CTA Button:** "Contact Us" or "Schedule a Consultation"
- **Optional:** Contact form, phone number, or email link

**Example:**

```
Ready to transform your business with expert [category] services? Let's discuss how we can help you achieve your goals. Contact us today for a free consultation.
```

---

## Content Guidelines

### Tone & Style

- **Professional yet approachable:** Use clear, jargon-free language
- **Benefit-focused:** Emphasize outcomes and value, not just features
- **Client-centric:** Use "you" and "your" to speak directly to visitors
- **Concise:** Keep sections scannable with clear headings and short paragraphs

### SEO Considerations

- Include category name in H1 (hero heading)
- Use relevant keywords naturally throughout content
- Include internal links to individual service pages
- Add meta description that summarizes the category and key services

### Visual Elements

- Use consistent imagery that represents the category
- Include icons or graphics for features/benefits
- Ensure all images are optimized and accessible
- Consider using brand colors and styling consistent with the site

### Content Length

- **Hero:** 1-2 sentences
- **Overview:** 150-300 words
- **Services Grid:** Auto-populated from CMS
- **Benefits:** 3-6 items, 1-2 sentences each
- **Process:** 100-200 words (if included)
- **CTA:** 1-2 sentences + button

---

## CMS Schema Recommendations

To support this structure, consider adding these fields to `serviceCategory`:

- `heroHeading` (string) - Optional override for hero heading
- `heroDescription` (text) - Hero section description
- `overview` (array of blocks) - Rich text overview content
- `benefits` (array of objects) - Key benefits/features
- `process` (array of blocks) - Process/methodology content
- `sections` (array of section objects) - Flexible sections (same as service schema)
- `seo` (seo object) - SEO metadata
- `ctaHeading` (string) - CTA section heading
- `ctaContent` (text) - CTA section description
