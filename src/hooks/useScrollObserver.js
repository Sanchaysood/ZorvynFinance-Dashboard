import { useEffect, useRef } from 'react'

export function useScrollObserver() {
  const ref = useRef(null)
  const observerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-scroll-visible')
          // Optional: Stop observing after animation triggers
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px', // Start animation a bit before element is fully visible
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    observerRef.current = observer

    return () => {
      if (observerRef.current && ref.current) {
        observerRef.current.unobserve(ref.current)
      }
    }
  }, [])

  return ref
}
