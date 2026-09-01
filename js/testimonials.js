// Testimonials Management

// Fetch verified testimonials
async function fetchTestimonials() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('verified', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    console.log('Testimonials:', data);
    return data;
  } catch (error) {
    console.error('Error fetching testimonials:', error.message);
    return null;
  }
}

// Submit testimonial
async function submitTestimonial(testimonialData) {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonialData]);
    
    if (error) throw error;
    console.log('Testimonial submitted:', data);
    return data;
  } catch (error) {
    console.error('Error submitting testimonial:', error.message);
    return null;
  }
}

// Verify testimonial (admin only)
async function verifyTestimonial(id) {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .update({ verified: true })
      .eq('id', id);
    
    if (error) throw error;
    console.log('Testimonial verified:', data);
    return data;
  } catch (error) {
    console.error('Error verifying testimonial:', error.message);
    return null;
  }
}