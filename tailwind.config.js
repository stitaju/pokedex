/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust paths for your project structure
  ],
  theme: {
    extend: {
      // Extend colors
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        accent: '#e3342f',
        dark: '#1a202c',
      },
      // Extend font family
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      // Extend spacing (margin/padding)
      spacing: {
        18: '4.5rem',
        72: '18rem',
      },
      // Extend border radius
      borderRadius: {
        xl: '1.5rem',
      },
      // Extend shadows
      boxShadow: {
        'inner-lg': 'inset 0 4px 6px rgba(0, 0, 0, 0.1)',
        'outline-light': '0 0 0 2px rgba(59, 130, 246, 0.5)', // Custom outline
      },
    },
  },
  plugins: [
    // Optionally add plugins like typography or forms if needed
    require('@tailwindcss/forms'),  // For better form styles
    require('@tailwindcss/typography'), // For typography utilities
  ],
  corePlugins: {
    // You can disable core plugins you don't need to reduce CSS output size
    preflight: true, // Reset base styles (e.g., normalize CSS)
  },
}
