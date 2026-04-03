export default function HeaderNew() {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent transition-colors duration-300">
          Welcome back 👋
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">
          Master your finances effortlessly
        </p>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed transition-colors duration-300">
          Track expenses, monitor income, analyze spending patterns, and achieve your financial goals all in one place.
        </p>
      </div>
    </div>
  )
}
