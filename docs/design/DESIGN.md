---
name: Functional Precision
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#51434c'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#83727c'
  outline-variant: '#d5c1cc'
  surface-tint: '#923f81'
  primary: '#510047'
  on-primary: '#ffffff'
  primary-container: '#6c1d5f'
  on-primary-container: '#e98ad1'
  inverse-primary: '#fface8'
  secondary: '#7f4d79'
  on-secondary: '#ffffff'
  secondary-container: '#ffc1f4'
  on-secondary-container: '#7c4a76'
  tertiary: '#4c1800'
  on-tertiary: '#ffffff'
  tertiary-container: '#702700'
  on-tertiary-container: '#ff8a56'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd7f0'
  primary-fixed-dim: '#fface8'
  on-primary-fixed: '#3a0032'
  on-primary-fixed-variant: '#762668'
  secondary-fixed: '#ffd7f5'
  secondary-fixed-dim: '#f0b3e6'
  on-secondary-fixed: '#330932'
  on-secondary-fixed-variant: '#653660'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb597'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7e2c00'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system is engineered for the Xebia Exam Platform, emphasizing a "wireframe-plus" aesthetic. The goal is to minimize cognitive load during high-stakes assessments while maintaining a professional, authoritative presence. The visual language is structured, clean, and utilitarian, borrowing from **Minimalism** and **Corporate Modern** styles to ensure that the content—the examination itself—remains the primary focus.

The personality is dependable and calm, utilizing a "Tranquil Velvet" core to provide a sense of stability. It avoids unnecessary decoration, instead using precise alignment and subtle tonal shifts to guide the user's attention through complex workflows like exam creation, proctoring, and certification.

## Colors

The palette is built around "Tranquil Velvet," used strategically for primary branding and navigation elements. 

- **Primary & Secondary:** Use the deep purples for headers and high-level navigation to anchor the UI.
- **Surface & Background:** The UI utilizes a "Blueish Grey" background to reduce glare, with White reserved for active workspace cards and input areas.
- **Functional Semantics:** 
    - **Emerald (#01AC9F)** signals completed sections, correct answers, and active proctoring status.
    - **CTA Orange (#FF6200)** is reserved for critical warnings, "Start Exam" buttons, or "Submit" actions to provide high-contrast visibility against the cool grey and purple backdrop.
    - **Greyscale:** Used for structural borders and secondary text to maintain a hierarchy that feels balanced and never overwhelming.

## Typography

The typography scale prioritizes legibility in reading-heavy environments. **Hanken Grotesk** is used for headlines to provide a modern, sharp, and professional brand voice. **Inter** is the workhorse for all body content and exam questions due to its exceptional clarity at various sizes.

For technical data—such as candidate IDs, timestamps, or system logs in the proctoring view—**JetBrains Mono** is utilized as a label font to differentiate system metadata from human-readable content. 

Text should maintain a high contrast ratio against white surfaces (Dark Grey #5A5A5A) to ensure accessibility during long sessions.

## Layout & Spacing

This design system employs a **Fixed Grid** model for administrative views and a centered **Fluid Column** for the exam-taking experience. 

- **Grid:** A 12-column grid with 24px gutters is the standard for dashboards. 
- **Rhythm:** All spacing is derived from an 8px base unit. 
- **Layout Adaptration:**
    - **Desktop:** Side navigation (280px) with fluid content area.
    - **Tablet:** Side navigation collapses into a rail or hamburger menu; margins reduce to 16px.
    - **Mobile:** Content stacks vertically. Exam questions occupy 100% of the viewport width minus 16px margins on each side.

## Elevation & Depth

To maintain the "wireframe-plus" aesthetic, this design system avoids heavy shadows and skeuomorphism. Depth is communicated through **Tonal Layers** and **Low-Contrast Outlines**:

- **Level 0 (Background):** Blueish Grey (#F7F8FC) for the canvas.
- **Level 1 (Card/Surface):** Pure White (#FFFFFF) with a 1px border (#DEDEDE). No shadow.
- **Level 2 (Active/Hover):** White with a soft, 4px blur, 5% opacity shadow using the Primary Color (#6C1D5F) as the tint.
- **Level 3 (Modals):** White with a 16px diffused neutral shadow to separate critical actions from the background.

## Shapes

The shape language is consistent and "Soft-Rounded." An 8px (0.5rem) radius is the standard for all primary containers, cards, and buttons.

- **Standard (8px):** Buttons, Input Fields, Cards, and Tables.
- **Large (16px):** Modals and flyout panels.
- **Full (Pill):** Status chips (e.g., "In Progress," "Passed") and search bars.

This moderate roundedness balances the professional nature of the platform with a modern, approachable feel.

## Components

### Buttons
- **Primary:** Tranquil Velvet (#6C1D5F) background, White text. 8px radius.
- **Action/CTA:** CTA Orange (#FF6200) for "Submit Exam" or "Start."
- **Secondary:** Transparent background with a 1px border of Medium Blueish Grey (#DADCEA).

### Input Fields
- White background, 1px Blueish Grey border. 
- On focus: Border changes to Primary Color (#6C1D5F) with a 2px outer glow (10% opacity).
- Labels use Inter Bold (14px) in Dark Grey.

### Cards
- Pure White background. 1px border (#DEDEDE). 
- Headers within cards should have a subtle bottom border or a light Blueish Grey (#F7F8FC) background to differentiate from the content.

### Status Chips
- Use the semantic colors with 10% opacity for the background and 100% opacity for the text (e.g., Success chip: Light Emerald background, Dark Emerald text).

### Tables
- Header row uses a light Blueish Grey background. 
- Rows should have a subtle hover state (#F7F8FC) to help users track data across large datasets. No vertical grid lines; use horizontal dividers only.