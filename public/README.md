# Public Assets Folder

This folder contains public static assets that can be accessed directly from the portal.

## Company Logo

To add your company logo:

1. Place your logo image file (e.g., `logo.png` or `logo.svg`) in this `public` folder
2. Reference it in your components using: `/logo.png` or `/logo.svg`

### Example Usage:

```tsx
import Image from 'next/image';

// In your component
<Image src="/logo.png" alt="Company Logo" width={200} height={50} />
```

Or with a regular img tag:

```tsx
<img src="/logo.png" alt="Company Logo" style={{ width: '200px', height: '50px' }} />
```

## File Structure

```
public/
  ├── logo.png (or logo.svg) - Company logo
  └── README.md - This file
```

## Notes

- Files in the `public` folder are served from the root URL path
- For example: `public/logo.png` is accessible at `/logo.png`
- Supported formats: PNG, JPG, SVG, GIF, etc.
