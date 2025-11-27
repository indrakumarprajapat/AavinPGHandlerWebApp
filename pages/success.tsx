export default function Success() {
  console.log("Success page rendered");

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-black text-green-800 dark:text-green-200">
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-6">Your EasyPay transaction has been completed successfully.</p>
      <a 
        href="/"
        className="px-6 py-2 text-lg bg-green-600 hover:bg-green-700 text-white rounded-md"
      >
        Go Back Home
      </a>
    </div>
  );
}