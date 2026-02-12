# DMDesk - CRM for Instagram Sellers

A modern, full-featured Customer Relationship Management (CRM) platform designed specifically for Instagram sellers and social commerce businesses. DMDesk helps you manage orders, track customers, and streamline your operations - turning your DMs into a professional business dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)

## ✨ Features

### 🎯 Core Functionality
- **Order Management** - Track orders from "Pending Payment" to "Delivered" with a clean, intuitive interface
- **Customer CRM** - Manage customer information, track spending history, and save shipping details automatically
- **Revenue Analytics** - Visual charts and insights for revenue, orders, and products
- **Product Management** - Organize and track your product inventory
- **Payment Integration** - Secure PayPal payment processing for order completion
- **Address Collection** - Streamlined checkout flow with address collection before payment

### 🎨 User Experience
- **Smooth Animations** - Beautiful, performant animations powered by Framer Motion
- **Responsive Design** - Fully responsive design that works on all devices
- **Dark Mode Support** - Built-in dark mode support
- **Modern UI** - Clean, professional interface built with Radix UI and Tailwind CSS
- **Page Transitions** - Smooth transitions between pages

### 🔒 Security & Performance
- **Row Level Security** - Database-level security with Supabase RLS policies
- **Server-Side Rendering** - Optimized performance with Next.js App Router
- **Type Safety** - Full TypeScript support for better developer experience
- **Secure Authentication** - Supabase Auth with session management

## 🚀 Tech Stack

### Frontend
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.34.0** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service (PostgreSQL database, Authentication, Storage)
- **Supabase SSR** - Server-side rendering support

### Payment Processing
- **PayPal SDK** - Payment integration via `@paypal/react-paypal-js`

### Validation & Utilities
- **Zod 4.3.6** - Schema validation
- **Class Variance Authority** - Component variant management
- **clsx & tailwind-merge** - Conditional class utilities

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher
- **npm**, **yarn**, or **pnpm**
- **Supabase account** (free tier works)
- **PayPal Developer account** (optional, for payment features)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhammukherjee17/DMDesk.git
   cd DMDesk
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
   
   # PayPal Configuration (Optional - app works in mock mode without this)
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_SECRET=your_paypal_secret
   PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com  # Use https://api-m.paypal.com for production
   ```

4. **Set up Supabase Database**
   
   Run the SQL schema in your Supabase SQL Editor:
   ```bash
   # Copy the contents of schema.sql and run it in Supabase SQL Editor
   ```
   
   The schema includes:
   - Users table (syncs with auth.users)
   - Customers table
   - Products table
   - Orders table
   - Order items table
   - Addresses table
   - Row Level Security (RLS) policies

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
micro-saas/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   ├── signup/
│   │   └── actions.ts            # Server actions for auth
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── dashboard/            # Main dashboard
│   │   ├── orders/               # Order management
│   │   ├── products/             # Product management
│   │   ├── customers/            # Customer management
│   │   ├── analytics/            # Analytics & reports
│   │   ├── settings/             # User settings
│   │   └── support/              # Support page
│   ├── api/                      # API routes
│   │   ├── auth/user/            # User authentication API
│   │   ├── orders/[id]/         # Order API endpoints
│   │   └── paypal/               # PayPal payment APIs
│   ├── order/[id]/               # Public order pages
│   │   ├── address/             # Address collection
│   │   └── success/             # Payment success page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                    # React components
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── animated-dashboard.tsx
│   ├── payment/                   # Payment components
│   │   └── paypal-button.tsx
│   └── ui/                        # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── animated-card.tsx
│       ├── page-transition-wrapper.tsx
│       └── ...                    # Other UI components
├── lib/                           # Utility libraries
│   ├── services/                  # Business logic services
│   │   ├── order-service.ts
│   │   └── stats-service.ts
│   ├── supabase/                  # Supabase client configurations
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Auth middleware
│   ├── validations/               # Zod schemas
│   │   └── orders.ts
│   └── utils.ts                  # Utility functions
├── hooks/                         # React hooks
│   └── use-order-count.ts
├── types/                         # TypeScript type definitions
│   └── database.types.ts
├── public/                        # Static assets
├── schema.sql                     # Database schema
├── middleware.ts                  # Next.js middleware
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── PAYPAL_SETUP.md               # PayPal integration guide
└── package.json                   # Dependencies
```

## 🎯 Key Features Breakdown

### Order Management
- Create, update, and delete orders
- Track order status (pending, paid, shipped, delivered, cancelled)
- Payment status tracking
- Customer association
- Order amount tracking
- Recent orders dashboard

### Customer CRM
- Customer profile management
- Order history per customer
- Contact information storage
- Automatic customer creation on order

### Analytics Dashboard
- Total revenue tracking
- Order count statistics
- Pending payments overview
- Active customers count
- Recent sales table with animations

### Payment Integration
- PayPal payment processing
- Secure payment capture
- Order status updates after payment
- Address collection before payment
- Payment success/failure handling
- Mock mode for development (works without PayPal credentials)

For detailed PayPal setup instructions, see [PAYPAL_SETUP.md](./PAYPAL_SETUP.md)

## 🔐 Authentication

DMDesk uses Supabase Authentication for user management:
- Email/password authentication
- Secure session management
- Protected routes via middleware
- Row-level security for data access
- Server-side and client-side auth support

## 🎨 Styling & Animations

- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations including:
  - Page transitions
  - Component entrances
  - Hover effects
  - Loading states
  - Staggered animations
- **Radix UI** for accessible components
- **Custom animations** on dashboard cards, tables, and navigation

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Supabase anon/public key | Yes |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal client ID | No* |
| `PAYPAL_SECRET` | PayPal secret key | No* |
| `PAYPAL_BASE_URL` | PayPal API base URL (sandbox/production) | No* |

*PayPal variables are optional - the app works in mock mode without them

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

The deployment will automatically:
- Detect Next.js framework
- Run build command
- Deploy to production

### Other Platforms

DMDesk can be deployed on any platform that supports Next.js:
- **Netlify**
- **Railway**
- **AWS Amplify**
- **DigitalOcean App Platform**
- **Render**

Make sure to set all required environment variables in your deployment platform.

## 🧪 Development

### Running Locally

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations (in Supabase SQL Editor)
# Copy and run schema.sql

# Start development server
npm run dev
```

### Code Structure

- **Server Components** - Used for data fetching and server-side logic
- **Client Components** - Marked with `'use client'` for interactivity
- **Server Actions** - Used for form submissions and mutations
- **API Routes** - RESTful endpoints for external integrations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint for code quality
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Ensure all environment variables are set
- Check that Supabase connection is working
- Verify database schema is applied

**Authentication Issues**
- Check Supabase credentials
- Verify RLS policies are set correctly
- Ensure middleware is configured properly

**PayPal Integration**
- Verify PayPal credentials are correct
- Check PayPal app settings
- See [PAYPAL_SETUP.md](./PAYPAL_SETUP.md) for detailed setup

## 📄 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For support:
- Open an issue in the repository
- Check the documentation
- Review [PAYPAL_SETUP.md](./PAYPAL_SETUP.md) for payment setup

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Backend infrastructure
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [PayPal](https://www.paypal.com/) - Payment processing
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library

## 📊 Project Status

- ✅ Authentication & Authorization
- ✅ Order Management
- ✅ Customer CRM
- ✅ Analytics Dashboard
- ✅ PayPal Integration
- ✅ Responsive Design
- ✅ Dark Mode Support
- ✅ Smooth Animations
- ✅ Address Collection Flow
- 🔄 Product Management (Basic)
- 🔄 Advanced Analytics (Planned)
- 🔄 Email Notifications (Planned)
- 🔄 Export Functionality (Planned)
- 🔄 Multi-user Access (Planned)

## 🎯 Roadmap

- [ ] Enhanced product management with images
- [ ] Advanced analytics with charts
- [ ] Email notifications for orders
- [ ] CSV export functionality
- [ ] Mobile app (React Native)
- [ ] Instagram integration
- [ ] Automated shipping label generation
- [ ] Inventory management
- [ ] Multi-currency support

---

**Built with ❤️ for Instagram sellers and social commerce entrepreneurs**

For questions or feedback, please open an issue or contact the development team.
