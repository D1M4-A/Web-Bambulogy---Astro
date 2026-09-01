# Bambulogy Website with Supabase Integration

## Setup Instructions

### 1. Supabase Project Setup

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → API → Copy your:
   - Project URL → `SUPABASE_URL`
   - anon public key → `SUPABASE_ANON_KEY`

### 2. Database Setup

1. Go to SQL Editor in Supabase
2. Run the SQL from `schema.sql` file
3. This will create all necessary tables and indexes

### 3. Configure Your Keys

In `index-supabase.html`, replace:
```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

### 4. Row Level Security (RLS)

For production, set up RLS policies:

```sql
-- Allow public to read destinations, menu items, etc.
CREATE POLICY "Public read destinations" ON destinations 
FOR SELECT USING (true);

-- Allow users to insert contact messages
CREATE POLICY "Users can insert contact messages" ON contact_messages
FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view their bookings
CREATE POLICY "Users can view own bookings" ON bookings
FOR SELECT USING (auth.uid() = user_id);
```

## File Structure

```
├── index-supabase.html        # Main HTML with Supabase integration
├── schema.sql                 # Database schema
├── js/
│   ├── destinations.js        # Destinations CRUD
│   ├── bookings.js            # Bookings management
│   ├── contact.js             # Contact form handling
│   ├── menu.js                # Menu management
│   ├── testimonials.js        # Testimonials
│   └── promos.js              # Promotions
└── supabase-config.js         # Configuration
```

## Database Tables

### destinations
- `id` (UUID)
- `name` (text)
- `description` (text)
- `location` (text)
- `image_url` (text)
- `price` (decimal)
- `capacity` (integer)

### menu_items
- `id` (UUID)
- `name` (text)
- `description` (text)
- `category` (text) - 'food', 'beverage', 'dessert'
- `price` (decimal)
- `image_url` (text)
- `is_new` (boolean)

### bookings
- `id` (UUID)
- `user_id` (UUID)
- `destination_id` (UUID)
- `booking_date` (date)
- `guests_count` (integer)
- `total_price` (decimal)
- `status` (text) - 'pending', 'confirmed', 'cancelled'

### contact_messages
- `id` (UUID)
- `name` (text)
- `email` (text)
- `phone` (text)
- `subject` (text)
- `message` (text)
- `status` (text) - 'unread', 'read', 'replied'

### testimonials
- `id` (UUID)
- `user_name` (text)
- `rating` (integer) 1-5
- `comment` (text)
- `image_url` (text)
- `verified` (boolean)
- `source` (text)

## Usage Examples

### Load Destinations
```javascript
const { data, error } = await supabase
  .from('destinations')
  .select('*');
```

### Submit Contact Form
```javascript
await supabase
  .from('contact_messages')
  .insert([{
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Inquiry about event',
    status: 'unread'
  }]);
```

### Create Booking
```javascript
await supabase
  .from('bookings')
  .insert([{
    user_id: userId,
    destination_id: destId,
    booking_date: '2026-12-25',
    guests_count: 10,
    status: 'pending'
  }]);
```

## Real-time Subscriptions (Optional)

For real-time updates:

```javascript
const subscription = supabase
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'testimonials' },
    payload => console.log('New testimonial:', payload.new)
  )
  .subscribe();
```

## Deployment

1. Replace `index-supabase.html` with `index.html`
2. Deploy to Vercel, Netlify, or any static host
3. Supabase handles the backend automatically
4. Database is accessible from anywhere with your API keys

## Security Best Practices

1. **Never expose secret key** - Always use anon key in frontend
2. **Enable RLS** - Set proper row-level security policies
3. **Validate input** - Check data on both frontend and backend
4. **Use HTTPS** - Always use HTTPS in production
5. **Rate limiting** - Set up rate limits for API endpoints

## Support

For Supabase documentation: [supabase.io/docs](https://supabase.io/docs)