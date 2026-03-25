export type Platform = 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'pinterest' | 'x';

export type PostType = 'story' | 'reel' | 'post' | 'ad' | 'cover' | 'profile' | 'video' | 'short';

export interface Property {
  id: string;
  title: string;
  location?: string;
  location_city?: string;
  location_area?: string;
  price: number;
  status: 'active' | 'pending' | 'sold' | 'archived';
  image?: string;
  images?: (string | { id: number; property_id: number; image_url: string; sort_order: number; is_hero: boolean })[];
  agent?: string;
  type?: string;
  listing_type?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  floor_size_m2?: number;
  amenities?: (string | { id: number; name: string })[];
  short_description?: string;
  currency?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Agent {
  id: string;
  full_name: string;
  role_optional?: string;
  email: string;
  cellphone_number: string;
  whatsapp_number?: string;
  office_number_optional?: string;
  bio_optional?: string;
  linkedin_url_optional?: string;
  instagram_url_optional?: string;
  profile_photo_url: string;
  active_listings?: number;
  total_sales?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface Branding {
  id: string;
  primary_color: string;
  primary_color_hex?: string;
  secondary_color: string;
  secondary_color_hex?: string;
  accent_color_hex?: string;
  background_color_hex?: string;
  logo_url: string;
  watermark_logo_optional_url?: string;
  font_family: string;
  body_font_family?: string;
  heading_font_family?: string;
  company_name: string;
  default_cta_text?: string;
  website_url?: string;
  default_hashtags_optional?: string;
}

export interface HistoryItem {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  created_at?: string;
  details: string;
  property_title?: string;
  agent_name?: string;
  platform?: string;
  thumbnail_url?: string;
  aspect_ratio?: string;
  style?: string;
  brand_name?: string;
}

export interface PostConfig {
  propertyId?: string;
  agentId?: string;
  platform?: Platform;
  type?: PostType;
  tone?: string;
  contentType?: string;
  brandingId?: string;
  activePreviewPlatform?: string;
  templateId?: string;
  selectedImages?: string[];
  selectedFacts?: string[];
  selectedAmenities?: string[];
  headlineOverride?: string;
  ctaOverride?: string;
  captionOverride?: string;
  subheadlineOverride?: string;
  videoUrl?: string;
  layoutStyle?: 'Modern' | 'Classic' | 'Minimal' | 'Bold' | 'Elegant';
  selectedPlatforms?: string[];
  contactToggles?: { whatsapp?: boolean; cell?: boolean; email?: boolean; photo?: boolean };
  preferences?: any;
}

export interface Template {
  id: string;
  name: string;
  type: PostType;
  preview_url: string;
  platforms: Platform[];
  category?: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Closed' | 'Archived';

export interface Lead {
  id: string;
  propertyId?: string;
  postId?: string;
  agentId?: string;
  source: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  status: LeadStatus;
  message?: string;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
  propertyTitle?: string;
  agentName?: string;
  notes?: LeadNote[];
  tasks?: LeadTask[];
}

export interface LeadNote {
  id: string;
  leadId: string;
  agentId: string;
  agentName?: string;
  content: string;
  createdAt: string;
}

export interface LeadTask {
  id: string;
  leadId: string;
  agentId: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export interface ScheduledPost {
  id?: string;
  propertyId: string;
  agentId?: string;
  platform?: Platform;
  platforms?: string[];
  type?: PostType;
  caption: string;
  scheduledAt?: string;
  date?: string;
  time?: string;
  status: 'scheduled' | 'published' | 'draft' | 'failed';
  image?: string;
  imageURL?: string;
  videoURL?: string;
  createdAt?: string;
  propertyTitle?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  avatar?: string;
}

export type UserRole = 'admin' | 'manager' | 'agent' | 'marketer' | 'developer';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}
