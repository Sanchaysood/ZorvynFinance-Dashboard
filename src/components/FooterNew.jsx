export default function FooterNew() {
  return (
    <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-8 sm:py-10 border-t border-gray-200 dark:border-white/10 mt-12 sm:mt-16 pb-8 transition-colors duration-300">
      <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">
        © 2026 Zorvyn Finance. All rights reserved.
      </p>
      <div className="flex gap-4 sm:gap-8">
        <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300 font-medium">
          Privacy Policy
        </a>
        <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300 font-medium">
          Terms
        </a>
        <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300 font-medium">
          Support
        </a>
      </div>
    </footer>
  )
}
