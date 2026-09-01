// Destinations Management

// Fetch all destinations
async function fetchDestinations() {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*');
    
    if (error) throw error;
    
    console.log('Destinations:', data);
    return data;
  } catch (error) {
    console.error('Error fetching destinations:', error.message);
    return null;
  }
}

// Add new destination (admin only)
async function addDestination(destinationData) {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .insert([destinationData]);
    
    if (error) throw error;
    console.log('Destination added:', data);
    return data;
  } catch (error) {
    console.error('Error adding destination:', error.message);
    return null;
  }
}

// Update destination
async function updateDestination(id, updates) {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
    console.log('Destination updated:', data);
    return data;
  } catch (error) {
    console.error('Error updating destination:', error.message);
    return null;
  }
}

// Delete destination
async function deleteDestination(id) {
  try {
    const { error } = await supabase
      .from('destinations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    console.log('Destination deleted');
    return true;
  } catch (error) {
    console.error('Error deleting destination:', error.message);
    return false;
  }
}