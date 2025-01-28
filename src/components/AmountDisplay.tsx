import { formatCurrency } from '../helpers'

interface AmountDisplayProps {
  label: string
  amount: number
}

function AmountDisplay({ label, amount }: AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      <span>{label}: </span>
      <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}

export default AmountDisplay
