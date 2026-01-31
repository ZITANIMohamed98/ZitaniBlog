import { useState, type FormEvent } from 'react';
import type { BlogPost, CreateBlogPost } from '../types/blog';
import './BlogForm.css';

interface BlogFormProps {
  initialData?: BlogPost;
  onSubmit: (data: CreateBlogPost) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const BlogForm = ({ initialData, onSubmit, onCancel, isLoading = false }: BlogFormProps) => {
  const [formData, setFormData] = useState<CreateBlogPost>({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    author: initialData?.author || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    readTime: initialData?.readTime || 5,
    tags: initialData?.tags || [],
    coverImage: initialData?.coverImage || '',
  });

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="excerpt">Excerpt *</label>
        <textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          required
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content (Markdown) *</label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={15}
          disabled={isLoading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="readTime">Read Time (minutes) *</label>
          <input
            type="number"
            id="readTime"
            value={formData.readTime}
            onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
            required
            min="1"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="coverImage">Cover Image URL</label>
        <input
          type="url"
          id="coverImage"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <div className="tags-input">
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
            placeholder="Type and press Enter"
            disabled={isLoading}
          />
          <button type="button" onClick={handleAddTag} disabled={isLoading}>
            Add Tag
          </button>
        </div>
        <div className="tags-list">
          {formData.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                disabled={isLoading}
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="primary">
          {isLoading ? 'Saving...' : initialData ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
