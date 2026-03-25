import React, { useState } from 'react';
import { 
  PlusSquare, 
  Search, 
  Image as ImageIcon, 
  Type, 
  Calendar, 
  Send, 
  ChevronRight, 
  ChevronLeft,
  X,
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Music2,
  Sparkles,
  Upload,
  Layout,
  MessageSquare,
  Hash,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { properties } from '../mockData';
import { Platform, PostType, Property } from '../types';
import Skeleton from './Skeleton';
import { formatCurrency } from '../utils/format';

const platforms: { id: Platform; icon: React.ReactNode; color: string; bg: string; activeColor: string }[] = [
  { 
    id: 'facebook', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ), 
    color: 'text-[#1877F2]', 
    bg: 'bg-[#1877F2]/10',
    activeColor: 'bg-[#1877F2] text-white'
  },
  { 
    id: 'instagram', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.58.016 4.85.071 1.17.054 1.81.245 2.23.408.56.218.96.475 1.38.895.42.42.677.82.895 1.38.163.42.354 1.06.408 2.23.055 1.27.071 1.647.071 4.85s-.016 3.58-.071 4.85c-.054 1.17-.245 1.81-.408 2.23-.218.56-.475.96-.895 1.38-.42.42-.82.677-1.38.895-.42.163-1.06.354-2.23.408-1.27.055-1.647.071-4.85.071s-3.58-.016-4.85-.071c-1.17-.054-1.81-.245-2.23-.408-.56-.218-.96-.475-1.38-.895-.42-.42-.677-.82-.895-1.38-.163-.42-.354-1.06-.408-2.23C2.176 15.58 2.16 15.203 2.16 12s.016-3.58.071-4.85c.054-1.17.245-1.81.408-2.23.218-.56.475-.96.895-1.38.42-.42.82-.677 1.38-.895.42-.163 1.06-.354 2.23-.408 1.27-.055 1.647-.071 4.85-.071zm0 3.662c-3.407 0-6.17 2.763-6.17 6.17s2.763 6.17 6.17 6.17 6.17-2.763 6.17-6.17-2.763-6.17-6.17-6.17zm0 10.18c-2.215 0-4.01-1.795-4.01-4.01s1.795-4.01 4.01-4.01 4.01 1.795 4.01 4.01-1.795 4.01-4.01 4.01zm6.406-11.845c0 .796-.646 1.442-1.442 1.442-.797 0-1.442-.646-1.442-1.442 0-.797.646-1.442 1.442-1.442.796 0 1.442.646 1.442 1.442z"/>
      </svg>
    ), 
    color: 'text-[#E4405F]', 
    bg: 'bg-[#E4405F]/10',
    activeColor: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white'
  },
  { 
    id: 'linkedin', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ), 
    color: 'text-[#0A66C2]', 
    bg: 'bg-[#0A66C2]/10',
    activeColor: 'bg-[#0A66C2] text-white'
  },
  { 
    id: 'youtube', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ), 
    color: 'text-[#FF0000]', 
    bg: 'bg-[#FF0000]/10',
    activeColor: 'bg-[#FF0000] text-white'
  },
  { 
    id: 'pinterest', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592 0 12.017 0z"/>
      </svg>
    ), 
    color: 'text-[#BD081C]', 
    bg: 'bg-[#BD081C]/10',
    activeColor: 'bg-[#BD081C] text-white'
  },
  { 
    id: 'x', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/>
      </svg>
    ), 
    color: 'text-black', 
    bg: 'bg-black/10',
    activeColor: 'bg-black text-white'
  },
];

const templates: Record<Platform, { id: PostType; label: string; size: string; aspectRatio: string }[]> = {
  facebook: [
    { id: 'story', label: 'Facebook Story', size: '1080 × 1920 px', aspectRatio: '9:16' },
    { id: 'post', label: 'Facebook Post (Landscape)', size: '1200 × 630 px', aspectRatio: '1.91:1' },
    { id: 'video', label: 'Facebook Video', size: '1080 × 1080 px', aspectRatio: '1:1' },
  ],
  instagram: [
    { id: 'story', label: 'Instagram Story', size: '1080 × 1920 px', aspectRatio: '9:16' },
    { id: 'post', label: 'Instagram Post (4:5)', size: '1080 × 1350 px', aspectRatio: '4:5' },
    { id: 'reel', label: 'Instagram Reel', size: '1080 × 1920 px', aspectRatio: '9:16' },
  ],
  linkedin: [
    { id: 'post', label: 'LinkedIn Post', size: '1200 × 1200 px', aspectRatio: '1:1' },
    { id: 'video', label: 'LinkedIn Video', size: '1080 × 1920 px', aspectRatio: '9:16' },
  ],
  youtube: [
    { id: 'short', label: 'YouTube Short', size: '1080 × 1920 px', aspectRatio: '9:16' },
    { id: 'video', label: 'YouTube Video', size: '1920 × 1080 px', aspectRatio: '16:9' },
  ],
  pinterest: [
    { id: 'post', label: 'Pinterest Pin (2:3)', size: '1000 × 1500 px', aspectRatio: '2:3' },
  ],
  x: [
    { id: 'post', label: 'Twitter / X Post', size: '1600 × 900 px', aspectRatio: '16:9' },
    { id: 'video', label: 'Twitter / X Video', size: '1600 × 900 px', aspectRatio: '16:9' },
  ],
};

const TemplateMockup = ({ type, platform, property }: { type: PostType; platform: Platform; property?: Property }) => {
  const propertyImage = property?.image || 
    (typeof property?.images?.[0] === 'string' ? property.images[0] : (property?.images?.[0] as any)?.image_url) || 
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400";

  if (platform === 'facebook') {
    if (type === 'story') {
      return (
        <div className="relative w-24 h-44 bg-white rounded-2xl border-4 border-white shadow-xl overflow-hidden flex flex-col scale-90 group-hover:scale-95 transition-transform duration-300">
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5">
            <div className="w-6 h-6 bg-[#1877F2] rounded-full flex items-center justify-center text-white shadow-sm border border-white/20">
              <Facebook className="w-4 h-4" />
            </div>
            <div className="text-[7px] font-bold text-white drop-shadow-sm">Your Story</div>
          </div>
          <div className="absolute top-1 left-0 right-0 px-2 flex gap-0.5 z-10">
            <div className="h-0.5 flex-1 bg-white/40 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-white" />
            </div>
            <div className="h-0.5 flex-1 bg-white/20 rounded-full" />
          </div>
          <div className="flex-1 bg-[#1e3a8a] relative">
            <img src={propertyImage} className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" alt="" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent flex flex-col gap-1">
            <div className="h-1.5 w-full bg-white/30 rounded-full" />
            <div className="h-1.5 w-2/3 bg-white/30 rounded-full" />
            <div className="mt-1 flex justify-between items-center">
              <div className="w-4 h-4 rounded-full bg-white/20" />
              <div className="w-8 h-3 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      );
    }
    if (type === 'post') {
      return (
        <div className="relative w-32 h-44 bg-white rounded-2xl border-4 border-white shadow-xl overflow-hidden flex flex-col scale-90 group-hover:scale-95 transition-transform duration-300">
          <div className="p-2 flex items-center gap-1.5 border-b border-gray-50">
            <div className="w-5 h-5 bg-[#1877F2] rounded-full flex items-center justify-center text-white">
              <Facebook className="w-3 h-3" />
            </div>
            <div className="flex-1">
              <div className="h-1.5 w-12 bg-gray-200 rounded-full mb-0.5" />
              <div className="h-1 w-6 bg-gray-100 rounded-full" />
            </div>
          </div>
          <div className="flex-1 bg-gray-50 p-2 flex flex-col gap-2">
            <div className="space-y-1">
              <div className="h-1 w-full bg-gray-200 rounded-full" />
              <div className="h-1 w-2/3 bg-gray-200 rounded-full" />
            </div>
            <div className="flex-1 rounded bg-blue-100 overflow-hidden relative">
              <img src={propertyImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
            </div>
          </div>
          <div className="h-8 bg-white border-t border-gray-50 flex items-center justify-around px-1">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gray-100 rounded-full" />
              <div className="h-1 w-4 bg-gray-100 rounded-full" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gray-100 rounded-full" />
              <div className="h-1 w-4 bg-gray-100 rounded-full" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gray-100 rounded-full" />
              <div className="h-1 w-4 bg-gray-100 rounded-full" />
            </div>
          </div>
        </div>
      );
    }
    if (type === 'video') {
      return (
        <div className="relative w-32 h-44 bg-white rounded-2xl border-4 border-white shadow-xl overflow-hidden flex flex-col scale-90 group-hover:scale-95 transition-transform duration-300">
          <div className="p-2 flex items-center gap-1.5 border-b border-gray-50">
            <div className="w-5 h-5 bg-[#1877F2] rounded-full flex items-center justify-center text-white">
              <Facebook className="w-3 h-3" />
            </div>
            <div className="flex-1">
              <div className="h-1.5 w-12 bg-gray-200 rounded-full mb-0.5" />
              <div className="h-1 w-6 bg-gray-100 rounded-full" />
            </div>
          </div>
          <div className="aspect-video bg-black relative">
            <img src={propertyImage} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" alt="" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[9px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
              </div>
            </div>
            <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-[#1877F2]" />
            </div>
          </div>
          <div className="flex-1 p-2 space-y-1.5">
            <div className="h-1.5 w-full bg-gray-100 rounded-full" />
            <div className="h-1.5 w-2/3 bg-gray-100 rounded-full" />
            <div className="flex justify-between items-center pt-1">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-gray-50 rounded-full" />
                <div className="w-2.5 h-2.5 bg-gray-50 rounded-full" />
              </div>
              <div className="h-1 w-6 bg-gray-50 rounded-full" />
            </div>
          </div>
        </div>
      );
    }
  }

  if (platform === 'instagram') {
    if (type === 'story') {
      return (
        <div className="relative w-24 h-44 bg-white rounded-2xl border-4 border-white shadow-xl overflow-hidden flex flex-col scale-90 group-hover:scale-95 transition-transform duration-300">
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full p-[1px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
              <div className="w-full h-full bg-white rounded-full p-[1px]">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" className="w-full h-full rounded-full object-cover" alt="" />
              </div>
            </div>
            <div className="text-[7px] font-bold text-white drop-shadow-sm">Your Story</div>
          </div>
          <div className="absolute top-1 left-0 right-0 px-2 flex gap-0.5 z-10">
            <div className="h-0.5 flex-1 bg-white/40 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-white" />
            </div>
            <div className="h-0.5 flex-1 bg-white/20 rounded-full" />
          </div>
          <div className="flex-1 bg-[#BE185D] relative">
            <img src={propertyImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center gap-2 bg-gradient-to-t from-black/40 to-transparent">
            <div className="flex-1 h-6 bg-transparent border border-white/40 rounded-full px-2 flex items-center">
              <div className="h-1 w-12 bg-white/40 rounded-full" />
            </div>
            <div className="w-4 h-4 text-white opacity-80 flex items-center justify-center">
              <Send className="w-3 h-3" />
            </div>
          </div>
        </div>
      );
    }
    if (type === 'post') {
      return (
        <div className="relative w-32 h-44 bg-white rounded-2xl border-4 border-white shadow-xl overflow-hidden flex flex-col scale-90 group-hover:scale-95 transition-transform duration-300">
          <div className="p-2 flex items-center gap-2 border-b border-gray-50">
            <div className="w-5 h-5 rounded-full p-[1px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
              <div className="w-full h-full bg-white rounded-full p-[1px]">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" className="w-full h-full rounded-full object-cover" alt="" />
              </div>
            </div>
            <div className="flex-1">
              <div className="h-1.5 w-12 bg-gray-200 rounded-full mb-0.5" />
              <div className="h-1 w-8 bg-gray-100 rounded-full" />
            </div>
          </div>
          <div className="aspect-square bg-gray-50 relative overflow-hidden">
            <img src={propertyImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
          </div>
          <div className="p-2 space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full" />
                <div className="w-3 h-3 bg-gray-200 rounded-full" />
                <div className="w-3 h-3 bg-gray-200 rounded-full" />
              </div>
              <div className="w-3 h-3 bg-gray-200 rounded-sm" />
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-gray-100 rounded-full" />
              <div className="h-1.5 w-2/3 bg-gray-100 rounded-full" />
            </div>
          </div>
        </div>
      );
    }
    if (type === 'reel') {
      return (
        <div className="relative w-24 h-44 bg-white rounded-2xl border-4 border-white shadow-xl overflow-hidden flex flex-col scale-90 group-hover:scale-95 transition-transform duration-300">
          <div className="flex-1 bg-[#701A75] relative">
            <img src={propertyImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
            <div className="absolute right-2 bottom-12 flex flex-col gap-3 items-center">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-5 h-5 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/60 rounded-full" /></div>
                <div className="h-1 w-3 bg-white/40 rounded-full" />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-5 h-5 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/60 rounded-full" /></div>
                <div className="h-1 w-3 bg-white/40 rounded-full" />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-5 h-5 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/60 rounded-full" /></div>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-8">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-5 h-5 rounded-full overflow-hidden border border-white/40">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="h-1.5 w-12 bg-white rounded-full" />
              </div>
              <div className="h-1.5 w-full bg-white/60 rounded-full" />
            </div>
          </div>
        </div>
      );
    }
  }

  if (platform === 'linkedin') {
    return (
      <div className="relative w-32 h-44 bg-white rounded-2xl border-4 border-white shadow-xl overflow-hidden flex flex-col scale-90 group-hover:scale-95 transition-transform duration-300">
        <div className="p-2 flex items-center gap-2 border-b border-gray-50">
          <div className="w-5 h-5 bg-[#0A66C2] rounded-sm flex items-center justify-center text-white">
            <Linkedin className="w-3 h-3" />
          </div>
          <div className="h-2 w-16 bg-gray-100 rounded-full" />
        </div>
        <div className="flex-1 p-2 space-y-2">
          <div className="flex gap-1.5">
            <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex-1">
              <div className="h-1.5 w-16 bg-gray-200 rounded-full mb-0.5" />
              <div className="h-1 w-12 bg-gray-100 rounded-full" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="h-1 w-full bg-gray-100 rounded-full" />
            <div className="h-1 w-full bg-gray-100 rounded-full" />
          </div>
          <div className="h-16 bg-blue-50 rounded border border-blue-100 relative overflow-hidden">
            <img src={propertyImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
          </div>
          <div className="flex justify-between items-center border-t border-gray-50 pt-1.5">
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 bg-gray-100 rounded-full" />
                <div className="h-1 w-3 bg-gray-100 rounded-full" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 bg-gray-100 rounded-full" />
                <div className="h-1 w-3 bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (platform === 'pinterest') {
    return (
      <div className="relative w-32 h-44 bg-white rounded-2xl border-4 border-white shadow-xl overflow-hidden flex flex-col scale-90 group-hover:scale-95 transition-transform duration-300">
        <div className="absolute top-2 left-2 z-10">
          <div className="w-5 h-5 bg-[#BD081C] rounded-full flex items-center justify-center text-white shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592 0 12.017 0z"/>
            </svg>
          </div>
        </div>
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-[#E60023] text-white text-[8px] px-2 py-0.5 rounded-full font-bold shadow-sm">Save</div>
        </div>
        <div className="flex-1 relative overflow-hidden">
          <img src={propertyImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
          <div className="absolute inset-0 bg-black/5" />
        </div>
        <div className="p-2 space-y-1.5 bg-white">
          <div className="h-2 w-full bg-gray-100 rounded-full" />
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-gray-200 rounded-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="h-1.5 w-12 bg-gray-100 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (platform === 'youtube') {
    if (type === 'video') {
      return (
        <div className="relative w-40 h-32 bg-white rounded-xl border-4 border-white shadow-xl overflow-hidden flex flex-col scale-90 group-hover:scale-95 transition-transform duration-300">
          <div className="absolute top-2 left-2 z-10">
            <div className="w-6 h-4 bg-[#FF0000] rounded-sm flex items-center justify-center text-white shadow-sm">
              <Youtube className="w-3 h-3" />
            </div>
          </div>
          <div className="flex-1 bg-black relative">
            <img src={propertyImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 px-1 bg-black/80 text-white text-[6px] rounded">12:45</div>
          </div>
          <div className="p-2 flex gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <div className="h-2 w-full bg-gray-100 rounded-full" />
              <div className="h-1.5 w-2/3 bg-gray-50 rounded-full" />
            </div>
          </div>
        </div>
      );
    }
    if (type === 'short') {
      return (
        <div className="relative w-24 h-44 bg-white rounded-2xl border-4 border-white shadow-xl overflow-hidden flex flex-col scale-90 group-hover:scale-95 transition-transform duration-300">
          <div className="absolute top-2 left-2 z-10">
            <div className="w-6 h-4 bg-[#FF0000] rounded-sm flex items-center justify-center text-white shadow-sm">
              <Youtube className="w-3 h-3" />
            </div>
          </div>
          <div className="flex-1 bg-gray-900 relative">
            <img src={propertyImage} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" alt="" />
            <div className="absolute bottom-2 left-2 right-8 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-gray-200 rounded-full" />
                <div className="h-1.5 w-12 bg-white rounded-full" />
              </div>
              <div className="h-1.5 w-full bg-white/60 rounded-full" />
            </div>
            <div className="absolute right-1 bottom-12 flex flex-col gap-3 items-center">
              <div className="w-5 h-5 bg-white/20 rounded-full" />
              <div className="w-5 h-5 bg-white/20 rounded-full" />
              <div className="w-5 h-5 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      );
    }
  }

  if (platform === 'x') {
    return (
      <div className="relative w-40 h-32 bg-white rounded-xl border-4 border-white shadow-xl overflow-hidden flex flex-col scale-90 group-hover:scale-95 transition-transform duration-300">
        <div className="absolute top-2 right-2 z-10">
          <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center text-white shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/>
            </svg>
          </div>
        </div>
        <div className="p-2 flex gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-12 bg-gray-900 rounded-full" />
              <div className="h-1.5 w-8 bg-gray-200 rounded-full" />
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full" />
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
              <img src={propertyImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
              {type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center px-1">
              <div className="w-3 h-3 bg-gray-100 rounded-full" />
              <div className="w-3 h-3 bg-gray-100 rounded-full" />
              <div className="w-3 h-3 bg-gray-100 rounded-full" />
              <div className="w-3 h-3 bg-gray-100 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Fallback for other platforms
  return (
    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300">
      <Layout size={32} />
    </div>
  );
};

const tones = ['Luxury', 'Professional', 'Urgent', 'Friendly', 'Minimalist'];

export default function Marketing() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['instagram']);
  const [selectedTemplate, setSelectedTemplate] = useState<PostType | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [caption, setCaption] = useState('');
  const [tone, setTone] = useState('Luxury');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isWorkspaceLoading, setIsWorkspaceLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('property');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const primaryPlatform = selectedPlatforms[0] || 'instagram';

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTemplateSelect = (templateId: PostType) => {
    setSelectedTemplate(templateId);
    setIsWorkspaceLoading(true);
    // Simulate loading workspace assets/data
    setTimeout(() => {
      setIsWorkspaceLoading(false);
      setExpandedSection('property');
    }, 800);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const generateCaption = () => {
    if (!selectedProperty) {
      // If no property selected, maybe show a hint or use first one
      setExpandedSection('property');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const property = selectedProperty;
      const platformTags = selectedPlatforms.map(p => `#${p}Marketing`).join(' ');
      const generated = `✨ Experience the pinnacle of ${tone.toLowerCase()} living at ${property.title}. Located in the heart of ${property.location || 'a prime location'}, this stunning ${(property.type || 'property').toLowerCase()} features ${property.beds || 0} beds and ${property.baths || 0} baths. \n\nDM for a private viewing! 🗝️\n\n#${(property.location || '').replace(/ /g, '')} #RealEstate #${tone}Living #DreamHome ${platformTags}`;
      setCaption(generated);
      setIsGenerating(false);
      setExpandedSection('content');
    }, 1500);
  };

  const handlePostNow = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8" role="status" aria-label="Loading Marketing Workspace">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-8 space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex gap-4">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-12 w-32 rounded-2xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="xl:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-32 w-full rounded-2xl" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Workspace */}
        <div className="xl:col-span-8 space-y-8">
          {/* Platform Selector */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">1. Select Platform</h3>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg">Required</span>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4" role="tablist" aria-label="Social Media Platforms">
              {platforms.map((platform) => {
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`Select ${platform.id}`}
                    onClick={() => {
                      setSelectedPlatforms(prev => {
                        if (prev.includes(platform.id)) {
                          if (prev.length === 1) return prev;
                          return prev.filter(p => p !== platform.id);
                        }
                        return [...prev, platform.id];
                      });
                      // If we toggle a platform, we might need to reset template if it's not compatible
                      // but for now we'll just keep it and use the first selected platform as primary
                    }}
                    className={`flex items-center gap-3 px-4 md:px-6 py-3 rounded-2xl transition-all font-bold text-sm border outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      isSelected
                        ? `${platform.activeColor} border-transparent shadow-lg shadow-indigo-100 scale-105`
                        : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <span className={isSelected ? 'text-white' : platform.color}>
                      {platform.icon}
                    </span>
                    <span className="capitalize">{platform.id}</span>
                    {isSelected && <Check className="w-4 h-4 ml-1" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Template Grid */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">2. Choose Template</h3>
              <span className="text-xs text-gray-400 font-medium">Optimized for {primaryPlatform}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" role="list" aria-label="Post Templates">
              {templates[primaryPlatform].map((template) => (
                <div key={template.id} className="space-y-4">
                  <button
                    role="listitem"
                    aria-label={`Select ${template.label} template`}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`w-full aspect-[4/3] rounded-[2rem] flex items-center justify-center transition-all group outline-none border-2 ${
                      selectedTemplate === template.id
                        ? 'border-indigo-600 bg-indigo-50/50'
                        : 'border-transparent bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <TemplateMockup type={template.id} platform={primaryPlatform} property={selectedProperty || undefined} />
                  </button>
                  <div className="px-1">
                    <p className="text-base font-bold text-gray-900">{template.label}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{template.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Editing Workspace (Only shown when template is selected) */}
          <AnimatePresence mode="wait">
            {selectedTemplate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {isWorkspaceLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-4">
                          <Skeleton className="w-10 h-10 rounded-xl" />
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-3 w-48" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* 3. Property Picker */}
                    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                      <button 
                        onClick={() => setExpandedSection(expandedSection === 'property' ? null : 'property')}
                        className="w-full p-6 md:p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                            <Search className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-bold text-gray-900">3. Select Property</h3>
                            <p className="text-xs text-gray-500 font-medium">
                              {selectedProperty ? selectedProperty.title : 'Attach a property to your post'}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'property' ? 'rotate-90' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {expandedSection === 'property' && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 md:p-8 pt-0 space-y-6 border-t border-gray-50">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                                <input
                                  type="text"
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  placeholder="Search properties by name or location..."
                                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {filteredProperties.map((property) => (
                                  <button
                                    key={property.id}
                                    onClick={() => {
                                      setSelectedProperty(property);
                                      setExpandedSection('content');
                                    }}
                                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group ${
                                      selectedProperty?.id === property.id
                                        ? 'border-indigo-600 bg-indigo-50/30'
                                        : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                                    }`}
                                  >
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                      <img src={property.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-bold text-gray-900 truncate">{property.title}</p>
                                      <p className="text-[10px] text-gray-500 font-medium truncate">{property.location}</p>
                                      <p className="text-xs font-black text-indigo-600 mt-1">{formatCurrency(property.price)}</p>
                                    </div>
                                    {selectedProperty?.id === property.id && (
                                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                        <Check className="w-4 h-4" />
                                      </div>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </section>

                    {/* 4. Content Generator */}
                    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                      <button 
                        onClick={() => setExpandedSection(expandedSection === 'content' ? null : 'content')}
                        className="w-full p-6 md:p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-bold text-gray-900">4. Caption & Hashtags</h3>
                            <p className="text-xs text-gray-500 font-medium">Automated content generation</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'content' ? 'rotate-90' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {expandedSection === 'content' && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 md:p-8 pt-0 space-y-6 border-t border-gray-50">
                              <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Tone</label>
                                <div className="flex flex-wrap gap-2">
                                  {tones.map((t) => (
                                    <button
                                      key={t}
                                      onClick={() => setTone(t)}
                                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        tone === t ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                      }`}
                                    >
                                      {t}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Generated Copy</label>
                                  <button 
                                    onClick={generateCaption}
                                    disabled={isGenerating}
                                    className="text-xs text-indigo-600 font-bold flex items-center gap-2 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                                  >
                                    {isGenerating ? 'Generating...' : 'Regenerate'}
                                    {!isGenerating && <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />}
                                  </button>
                                </div>
                                <div className="relative">
                                  <textarea
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    placeholder="Click regenerate to create a caption based on your property..."
                                    className="w-full h-40 p-5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none leading-relaxed"
                                  />
                                  <div className="absolute bottom-4 right-4 flex gap-2">
                                    <button className="p-2.5 bg-white rounded-xl text-gray-400 hover:text-indigo-600 shadow-sm border border-gray-100 transition-all"><MessageSquare className="w-4 h-4" /></button>
                                    <button className="p-2.5 bg-white rounded-xl text-gray-400 hover:text-indigo-600 shadow-sm border border-gray-100 transition-all"><Hash className="w-4 h-4" /></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </section>

                    {/* 5. Media Assets */}
                    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                      <button 
                        onClick={() => setExpandedSection(expandedSection === 'media' ? null : 'media')}
                        className="w-full p-6 md:p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-bold text-gray-900">5. Media Assets</h3>
                            <p className="text-xs text-gray-500 font-medium">Upload and optimize visuals</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'media' ? 'rotate-90' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {expandedSection === 'media' && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 md:p-8 pt-0 space-y-6 border-t border-gray-50">
                              <div className="border-2 border-dashed border-gray-100 rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-4 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all shadow-sm">
                                  <Upload className="w-8 h-8 text-gray-300 group-hover:text-indigo-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-900">Drag and drop images or videos</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Optimized for {primaryPlatform} {selectedTemplate} ({templates[primaryPlatform].find(t => t.id === selectedTemplate)?.aspectRatio})
                                  </p>
                                </div>
                                <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all shadow-sm">Browse Files</button>
                              </div>
                              
                              {selectedProperty && (
                                <div className="space-y-3">
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Suggested from Property</p>
                                  <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                                    {[selectedProperty.image, ...(selectedProperty.images || [])].map((img, idx) => {
                                      const url = typeof img === 'string' ? img : img.image_url;
                                      return (
                                        <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 group cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-all">
                                          <img src={url} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                                          <div className="absolute top-1 right-1">
                                            <div className="w-5 h-5 bg-white/90 rounded-full flex items-center justify-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <PlusSquare className="w-3 h-3" />
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </section>

                    {/* 6. Scheduling */}
                    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                      <button 
                        onClick={() => setExpandedSection(expandedSection === 'schedule' ? null : 'schedule')}
                        className="w-full p-6 md:p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-bold text-gray-900">6. Schedule & Publish</h3>
                            <p className="text-xs text-gray-500 font-medium">Choose when to go live</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'schedule' ? 'rotate-90' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {expandedSection === 'schedule' && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 md:p-8 pt-0 space-y-6 border-t border-gray-50">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</label>
                                  <input 
                                    type="date" 
                                    value={scheduledDate}
                                    onChange={(e) => setScheduledDate(e.target.value)}
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</label>
                                  <input 
                                    type="time" 
                                    value={scheduledTime}
                                    onChange={(e) => setScheduledTime(e.target.value)}
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                                  />
                                </div>
                              </div>
                              {selectedPlatforms.length > 1 && (
                                <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm">
                                    <RefreshCw className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs font-bold text-indigo-900">Multi-platform posting enabled</p>
                                    <p className="text-[10px] text-indigo-600 font-medium">
                                      This post will be shared to: {selectedPlatforms.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', ')}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </section>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Live Preview */}
        <div className="xl:col-span-4 space-y-8 xl:sticky xl:top-28">
          <section className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Live Preview</h3>
              <div className="flex gap-2">
                {selectedPlatforms.map(p => (
                  <div key={p} className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shadow-sm border border-gray-100">
                    {platforms.find(plat => plat.id === p)?.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Device Mockup */}
            <div className="relative mx-auto w-full max-w-[300px] aspect-[9/19] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden p-1">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20" />
              
              <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden relative">
                {/* Platform Header Mockup */}
                <div className="p-4 flex items-center gap-2 border-b border-gray-50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                  <div className="flex-1">
                    <div className="h-2 w-20 bg-gray-100 rounded-full mb-1" />
                    <div className="h-1.5 w-12 bg-gray-50 rounded-full" />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-gray-200" />
                    <div className="w-1 h-1 rounded-full bg-gray-200" />
                    <div className="w-1 h-1 rounded-full bg-gray-200" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="relative aspect-square bg-gray-50">
                  {selectedProperty ? (
                    <TemplateMockup type={selectedTemplate || 'post'} platform={primaryPlatform} property={selectedProperty} />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                      <ImageIcon className="w-10 h-10 mb-2" />
                      <p className="text-[10px] font-bold">Select property to preview</p>
                    </div>
                  )}
                </div>

                {/* Interaction Bar */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <div className="w-5 h-5 border-2 border-gray-200 rounded-full" />
                      <div className="w-5 h-5 border-2 border-gray-200 rounded-full" />
                      <div className="w-5 h-5 border-2 border-gray-200 rounded-full" />
                    </div>
                    <div className="w-5 h-5 border-2 border-gray-200 rounded-full" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-full bg-gray-100 rounded-full" />
                    <div className="h-2 w-3/4 bg-gray-100 rounded-full" />
                  </div>
                  <p className="text-[11px] text-gray-600 line-clamp-4 leading-relaxed">
                    {caption || 'Your generated caption will appear here once you select a property and tone...'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 px-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Post Details</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Format</span>
                <span className="font-bold text-gray-900 capitalize">{selectedTemplate || 'Post'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Aspect Ratio</span>
                <span className="font-bold text-gray-900">{templates[primaryPlatform].find(t => t.id === selectedTemplate)?.aspectRatio || '1:1'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button 
                disabled={!selectedTemplate || !selectedProperty}
                className="py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Calendar className="w-5 h-5" />
                Schedule
              </button>
              <button 
                disabled={!selectedTemplate || !selectedProperty}
                onClick={handlePostNow}
                className="py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                Post Now to {selectedPlatforms.length} {selectedPlatforms.length === 1 ? 'Platform' : 'Platforms'}
              </button>
            </div>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-24 left-6 right-6 bg-green-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Post Published Successfully!</p>
                    <p className="text-[10px] opacity-90">Your content is now live on {selectedPlatforms.join(', ')}.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!selectedTemplate && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center p-8 text-center">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 space-y-3 max-w-[240px]">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto">
                    <Layout className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-gray-900">Select a template to start previewing</p>
                  <p className="text-xs text-gray-500">Choose from the grid on the left to unlock the workspace.</p>
                </div>
              </div>
            )}
          </section>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Workspace Progress</p>
              <p className="text-xs font-bold text-indigo-600">
                {Math.round(((selectedPlatforms.length > 0 ? 1 : 0) + (selectedTemplate ? 1 : 0) + (selectedProperty ? 1 : 0) + (caption ? 1 : 0)) / 4 * 100)}%
              </p>
            </div>
            <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((selectedPlatforms.length > 0 ? 1 : 0) + (selectedTemplate ? 1 : 0) + (selectedProperty ? 1 : 0) + (caption ? 1 : 0)) / 4 * 100}%` }}
                className="h-full bg-indigo-600"
              />
            </div>
            <div className="flex justify-between gap-1">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    step <= ((selectedPlatforms.length > 0 ? 1 : 0) + (selectedTemplate ? 1 : 0) + (selectedProperty ? 1 : 0) + (caption ? 1 : 0)) 
                      ? 'bg-indigo-600' 
                      : 'bg-gray-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

