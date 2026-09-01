// Promos Management

// Fetch active promos
async function fetchActivePromos() {
  try {
    const { data, error } = await supabase
      .from('promos')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    console.log('Active promos:', data);
    return data;
  } catch (error) {
    console.error('Error fetching promos:', error.message);
    return null;
  }
}

// Fetch all promos (admin)
async function fetchAllPromos() {
  try {
    const { data, error } = await supabase
      .from('promos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    console.log('All promos:', data);
    return data;
  } catch (error) {
    console.error('Error fetching all promos:', error.message);
    return null;
  }
}

// Create promo (admin only)
async function createPromo(promoData) {
  try {
    const { data, error } = await supabase
      .from('promos')
      .insert([promoData]);
    
    if (error) throw error;
    console.log('Promo created:', data);
    return data;
  } catch (error) {
    console.error('Error creating promo:', error.message);
    return null;
  }
}

// Update promo status
async function updatePromoStatus(id, isActive) {
  try {
    const { data, error } = await supabase
      .from('promos')
      .update({ is_active: isActive })
      .eq('id', id);
    
    if (error) throw error;
    console.log('Promo status updated:', data);
    return data;
  } catch (error) {
    console.error('Error updating promo status:', error.message);
    return null;
  }
}