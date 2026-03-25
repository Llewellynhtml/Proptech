import { Property, Lead, ScheduledPost, Agent } from './types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    location_city: 'Beverly Hills',
    location_area: 'CA',
    price: 4500000,
    status: 'active',
    image: 'https://picsum.photos/seed/villa1/800/600',
    agent: 'John Doe',
    type: 'Villa',
    beds: 5,
    baths: 4,
    sqft: 4200,
  },
  {
    id: '2',
    title: 'Penthouse Apartment',
    location_city: 'Manhattan',
    location_area: 'NY',
    price: 2800000,
    status: 'pending',
    image: 'https://picsum.photos/seed/penthouse1/800/600',
    agent: 'Jane Smith',
    type: 'Apartment',
    beds: 3,
    baths: 2,
    sqft: 2100,
  },
  {
    id: '3',
    title: 'Beachfront Bungalow',
    location_city: 'Malibu',
    location_area: 'CA',
    price: 3200000,
    status: 'active',
    image: 'https://picsum.photos/seed/beach1/800/600',
    agent: 'John Doe',
    type: 'Bungalow',
    beds: 4,
    baths: 3,
    sqft: 3100,
  },
];

export const agents: Agent[] = [
  {
    id: '1',
    full_name: 'John Doe',
    email: 'john@example.com',
    cellphone_number: '+1 555-0101',
    profile_photo_url: 'https://i.pravatar.cc/150?u=john',
    role_optional: 'Senior Agent'
  },
  {
    id: '2',
    full_name: 'Jane Smith',
    email: 'jane@example.com',
    cellphone_number: '+1 555-0102',
    profile_photo_url: 'https://i.pravatar.cc/150?u=jane',
    role_optional: 'Listing Specialist'
  }
];

export const leads: Lead[] = [
  {
    id: '1',
    contactName: 'Alice Johnson',
    contactEmail: 'alice@example.com',
    contactPhone: '+1 555-0101',
    status: 'New',
    propertyId: '1',
    propertyTitle: 'Modern Luxury Villa',
    agentId: '1',
    agentName: 'John Doe',
    source: 'Facebook',
    createdAt: '2026-03-19T10:00:00Z',
    updatedAt: '2026-03-19T10:00:00Z',
  },
  {
    id: '2',
    contactName: 'Bob Smith',
    contactEmail: 'bob@example.com',
    contactPhone: '+1 555-0102',
    status: 'Contacted',
    propertyId: '2',
    propertyTitle: 'Penthouse Apartment',
    agentId: '2',
    agentName: 'Jane Smith',
    source: 'Instagram',
    createdAt: '2026-03-18T14:30:00Z',
    updatedAt: '2026-03-18T14:30:00Z',
  },
  {
    id: '3',
    contactName: 'Charlie Brown',
    contactEmail: 'charlie@example.com',
    contactPhone: '+1 555-0103',
    status: 'Qualified',
    propertyId: '1',
    propertyTitle: 'Modern Luxury Villa',
    agentId: '1',
    agentName: 'John Doe',
    source: 'LinkedIn',
    createdAt: '2026-03-17T09:15:00Z',
    updatedAt: '2026-03-17T09:15:00Z',
  },
];

export const scheduledPosts: ScheduledPost[] = [
  {
    id: '1',
    propertyId: '1',
    platform: 'instagram',
    type: 'post',
    caption: 'Check out this stunning luxury villa in Beverly Hills! #luxuryrealestate #beverlyhills',
    scheduledAt: '2026-03-21T10:00:00Z',
    status: 'scheduled',
    image: 'https://picsum.photos/seed/villa1/800/600',
  },
];
