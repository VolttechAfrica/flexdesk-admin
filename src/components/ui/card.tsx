import styles from "@styles/card.module.css"
import { User, ArrowUp } from "lucide-react"

interface CandidateCardProps {
  count?: string | number
  change?: string
  period?: string
  cardIcon?: React.ElementType 
  cardLabel?: string
  iconBg: string
  text?: string
  subIcon?: React.ElementType
}

export default function DashboardCard({
  count = 250,
  change = '',
  cardLabel = "Total number of Candidates",
  cardIcon: CardIcon = User,
  iconBg = styles.userIcon,
  text = "",
  subIcon: SubIcon,
  ...props
}: CandidateCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.iconContainer + " " + iconBg}>
          <CardIcon className={styles.icon} />
        </div>
        <span className={styles.count}>{count}</span>
      </div>
      <span className={styles.label}>{cardLabel}</span>
      <div className={styles.changeContainer}>
        <SubIcon className={styles.arrowIcon} />
        <span className={styles.changeText}>
          {change} {text}
        </span>
      </div>
    </div>
  )
}
