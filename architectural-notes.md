# Architectural Notes

## Analytics
- **Google Analytics (GA4)**: Implemented in `src/app/layout.tsx` using `next/script`.
  - **Measurement ID**: G-MJSK0X08X1
  - **Strategy**: `afterInteractive` to ensure it doesn't block hydration.
  - **Implementation**: Inline script for configuration and external script for the tag library.
