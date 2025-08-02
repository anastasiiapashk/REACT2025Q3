import type { FC } from 'react';
import { useState } from 'react';

const ErrorButton: FC = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('Test error from ErrorButton');
  }

  return (
    <button
      onClick={() => setThrowError(true)}
      className="mt-5 px-4 py-2 bg-red-500 text-black font-semibold rounded hover:bg-red-600 transition duration-200"
    >
      Throw Error
    </button>
  );
};

export default ErrorButton;
