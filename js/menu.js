// Menu Items Management

// Fetch all menu items
async function fetchMenuItems(category = null) {
  try {
    let query = supabase.from('menu_items').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    console.log('Menu items:', data);
    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error.message);
    return null;
  }
}

// Add menu item (admin only)
async function addMenuItem(menuData) {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .insert([menuData]);
    
    if (error) throw error;
    console.log('Menu item added:', data);
    return data;
  } catch (error) {
    console.error('Error adding menu item:', error.message);
    return null;
  }
}

// Update menu item
async function updateMenuItem(id, updates) {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
    console.log('Menu item updated:', data);
    return data;
  } catch (error) {
    console.error('Error updating menu item:', error.message);
    return null;
  }
}

// Delete menu item
async function deleteMenuItem(id) {
  try {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    console.log('Menu item deleted');
    return true;
  } catch (error) {
    console.error('Error deleting menu item:', error.message);
    return false;
  }
}