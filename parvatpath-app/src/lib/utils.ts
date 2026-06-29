import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function getSeatsColor(available: number): string {
  if (available <= 0) return 'text-gray-500'
  if (available < 5) return 'text-red-400'
  if (available < 10) return 'text-yellow-400'
  return 'text-green-400'
}

export function getDifficultyColor(difficulty: string): string {
  const map: Record<string, string> = {
    'Easy': 'bg-green-500/20 text-green-400 border border-green-500/30',
    'Easy-Moderate': 'bg-lime-500/20 text-lime-400 border border-lime-500/30',
    'Moderate': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    'Moderate-Difficult': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    'Difficult': 'bg-red-500/20 text-red-400 border border-red-500/30',
  }
  return map[difficulty] || 'bg-gray-500/20 text-gray-400'
}

export function getAvailableSeats(totalSeats: number, bookedSeats: number): number {
  return totalSeats - bookedSeats
}
