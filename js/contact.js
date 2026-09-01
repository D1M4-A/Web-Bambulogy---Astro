// Contact Form Management

// Submit contact form
async function submitContactForm(contactData) {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([contactData]);
    
    if (error) throw error;
    console.log('Contact message saved:', data);
    return data;
  } catch (error) {
    console.error('Error submitting contact form:', error.message);
    return null;
  }
}

// Fetch all contact messages (admin only)
async function fetchContactMessages() {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    console.log('Contact messages:', data);
    return data;
  } catch (error) {
    console.error('Error fetching contact messages:', error.message);
    return null;
  }
}

// Update message status
async function updateMessageStatus(id, status) {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
    console.log('Message status updated:', data);
    return data;
  } catch (error) {
    console.error('Error updating message status:', error.message);
    return null;
  }
}