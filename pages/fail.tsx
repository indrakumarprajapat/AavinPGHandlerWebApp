export default function Fail() {
  console.log("Fail page rendered");

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-red-50 to-red-100 dark:from-red-900 dark:to-black text-red-800 dark:text-red-200">
      <h1 className="text-4xl font-bold mb-4">Payment Failed!</h1>
      <p className="text-lg mb-6">Your EasyPay transaction could not be completed.</p>
      <a 
        href="/"
        className="px-6 py-2 text-lg bg-red-600 hover:bg-red-700 text-white rounded-md"
      >
        Try Again
      </a>
    </div>
  );
}