import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Response() {
  const router = useRouter();
  const [responseData, setResponseData] = useState<any>(null);

  useEffect(() => {
    console.log("Response page rendered with query:", router.query);
    setResponseData(router.query);
  }, [router.query]);

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900 dark:to-black text-blue-800 dark:text-blue-200 p-8">
      <h1 className="text-4xl font-bold mb-4">Payment Response</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Response Data:</h2>
        <pre className="text-left text-sm bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-auto text-gray-800 dark:text-gray-200">
          {JSON.stringify(responseData, null, 2)}
        </pre>
      </div>
      <a 
        href="/"
        className="mt-6 px-6 py-2 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-md"
      >
        Go Back Home
      </a>
    </div>
  );
}