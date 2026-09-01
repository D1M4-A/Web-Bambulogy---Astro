// Admin Dashboard Functions

// Get all bookings (admin only)
async function getAllBookings() {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, destinations(*), users(*)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    console.log('All bookings:', data);
    return data;
  } catch (error) {
    console.error('Error fetching all bookings:', error.message);
    return null;
  }
}

// Get dashboard statistics
async function getDashboardStats() {
  try {
    // Total bookings
    const { count: bookingsCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });
    
    // Total contacts
    const { count: contactsCount } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true });
    
    // Pending bookings
    const { count: pendingCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');
    
    // Unread messages
    const { count: unreadCount } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'unread');
    
    return {
      totalBookings: bookingsCount || 0,
      totalContacts: contactsCount || 0,
      pendingBookings: pendingCount || 0,
      unreadMessages: unreadCount || 0
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error.message);
    return null;
  }
}

// Update promo
async function updatePromo(id, promoData) {
  try {
    const { data, error } = await supabase
      .from('promos')
      .update(promoData)
      .eq('id', id);
    
    if (error) throw error;
    console.log('Promo updated:', data);
    return data;
  } catch (error) {
    console.error('Error updating promo:', error.message);
    return null;
  }
}

// Delete promo
async function deletePromo(id) {
  try {
    const { error } = await supabase
      .from('promos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    console.log('Promo deleted');
    return true;
  } catch (error) {
    console.error('Error deleting promo:', error.message);
    return false;
  }
}

// Export revenue report
async function getRevenueReport(startDate, endDate) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('total_price, status, created_at')
      .eq('status', 'confirmed')
      .gte('created_at', startDate)
      .lte('created_at', endDate);
    
    if (error) throw error;
    
    const totalRevenue = data.reduce((sum, booking) => sum + (booking.total_price || 0), 0);
    return {
      count: data.length,
      totalRevenue,
      bookings: data
    };
  } catch (error) {
    console.error('Error generating revenue report:', error.message);
    return null;
  }
}