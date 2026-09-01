// Bookings Management

// Create booking
async function createBooking(bookingData) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData]);
    
    if (error) throw error;
    console.log('Booking created:', data);
    return data;
  } catch (error) {
    console.error('Error creating booking:', error.message);
    return null;
  }
}

// Fetch user bookings
async function fetchUserBookings(userId) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, destinations(*)')
      .eq('user_id', userId);
    
    if (error) throw error;
    console.log('User bookings:', data);
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    return null;
  }
}

// Update booking status
async function updateBookingStatus(id, status) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
    console.log('Booking status updated:', data);
    return data;
  } catch (error) {
    console.error('Error updating booking status:', error.message);
    return null;
  }
}

// Delete booking
async function cancelBooking(id) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id);
    
    if (error) throw error;
    console.log('Booking cancelled:', data);
    return data;
  } catch (error) {
    console.error('Error cancelling booking:', error.message);
    return null;
  }
}