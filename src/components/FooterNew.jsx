export default function FooterNew() {
  return (
    <footer className="flex items-center justify-between px-6 py-6 border-t border-gray-200 dark:border-white/10 mt-12 transition-colors duration-300">
      <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300">
        © 2026 Zorvyn Fintech. All rights reserved.
      </p>
      <div className="flex gap-6">
        <a href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300">
          Privacy Policy
        </a>
        <a href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300">
          Terms
        </a>
        <a href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300">
          Support
        </a>
      </div>
    </footer>
  )
}
