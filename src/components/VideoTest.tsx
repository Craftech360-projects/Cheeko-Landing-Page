'use client';

import { useState } from 'react';

export function VideoTest() {
  const [status, setStatus] = useState<Record<string, string>>({});
  
  const testVideos = [
    {
      name: 'Desktop Video (Direct)',
      url: 'https://res.cloudinary.com/dqtrjeegb/video/upload/cheekoai/videos/desktop_video.mp4'
    },
    {
      name: 'Mobile Video (Direct)',
      url: 'https://res.cloudinary.com/dqtrjeegb/video/upload/cheekoai/videos/mobile_video.mp4'
    },
    {
      name: 'Popup Video (Direct)',
      url: 'https://res.cloudinary.com/dqtrjeegb/video/upload/cheekoai/videos/popup_video.mp4'
    },
    {
      name: 'Desktop Video (Local)',
      url: '/videos/desktop_video.mp4'
    }
  ];
  
  return (
    <div className="fixed bottom-20 right-4 bg-white p-4 rounded-lg shadow-lg max-w-md z-50">
      <h3 className="font-bold mb-2">Video Test Panel</h3>
      <div className="space-y-2 text-sm">
        {testVideos.map((video, idx) => (
          <div key={idx} className="border p-2 rounded">
            <p className="font-medium">{video.name}</p>
            <p className="text-xs text-gray-600 break-all">{video.url}</p>
            <video
              src={video.url}
              className="w-full h-20 mt-1"
              controls
              muted
              onLoadedMetadata={() => {
                setStatus(prev => ({ ...prev, [video.name]: '✅ Loaded' }));
              }}
              onError={() => {
                setStatus(prev => ({ ...prev, [video.name]: '❌ Failed' }));
              }}
            />
            <p className="text-xs mt-1">{status[video.name] || '⏳ Loading...'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}