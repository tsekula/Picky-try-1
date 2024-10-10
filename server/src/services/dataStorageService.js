const { createClient } = require('@supabase/supabase-js');

class DataStorageService {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
  }

  // User related methods
  async createUser(email) {
    const { data, error } = await this.supabase
      .from('User')
      .insert({ email })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getUserById(userId) {
    const { data, error } = await this.supabase
      .from('User')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  }

  // Image related methods
  async createImage(userId, fileInfo) {
    const { data, error } = await this.supabase
      .from('Image')
      .insert({
        user_id: userId,
        file_path: fileInfo.path,
        file_name: fileInfo.name,
        file_size: fileInfo.size,
        mime_type: fileInfo.type,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getImagesByUserId(userId) {
    const { data, error } = await this.supabase
      .from('Image')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  }

  // Tag related methods
  async createTag(name, category) {
    const { data, error } = await this.supabase
      .from('Tag')
      .insert({ name, category })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async tagImage(imageId, tagId, confidenceScore) {
    const { data, error } = await this.supabase
      .from('ImageTag')
      .insert({ image_id: imageId, tag_id: tagId, confidence_score: confidenceScore })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // Analysis result methods
  async saveAnalysisResult(imageId, analysisType, result) {
    const { data, error } = await this.supabase
      .from('AnalysisResult')
      .insert({ image_id: imageId, analysis_type: analysisType, result })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getAnalysisResults(imageId) {
    const { data, error } = await this.supabase
      .from('AnalysisResult')
      .select('*')
      .eq('image_id', imageId);
    if (error) throw error;
    return data;
  }

  // Vector search method
  async findSimilarImages(embedding, limit = 10) {
    const { data, error } = await this.supabase.rpc('match_images', {
      query_embedding: embedding,
      match_threshold: 0.8,
      match_count: limit
    });
    if (error) throw error;
    return data;
  }
}

module.exports = new DataStorageService();
