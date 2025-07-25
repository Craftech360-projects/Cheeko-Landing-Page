'use client';

import { trackEvent } from './GoogleTagManager';

export function GATestButton() {
  const testGA = () => {
    console.log('[GA Test] Sending test event...');
    trackEvent('test_event', {
      test_parameter: 'test_value',
      timestamp: new Date().toISOString()
    });
    alert('Test event sent! Check console and GA Real-time reports.');
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <button
      onClick={testGA}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#f36e24',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 9999,
        fontSize: '14px',
        fontWeight: 'bold'
      }}
    >
      Test GA Event
    </button>
  );
}