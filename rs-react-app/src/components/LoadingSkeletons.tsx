import { Component } from 'react';

export default class LoadingSkeletons extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            role="presentation"
            aria-label="Loading character placeholder"
            style={{
              width: '150px',
              height: '250px',
              backgroundColor: '#e0e0e0',
              borderRadius: '8px',
              animation: 'pulse 1.5s infinite ease-in-out',
            }}
          />
        ))}
      </div>
    );
  }
}
