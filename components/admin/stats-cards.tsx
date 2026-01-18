interface StatsCardsProps {
  total: number
  qualified: number
}

export function StatsCards({ total, qualified }: StatsCardsProps) {
  const conversionRate = total > 0 ? Math.round((qualified / total) * 100) : 0

  const stats = [
    { name: 'Total Leads', value: total, color: 'bg-blue-500' },
    { name: 'Qualified Leads', value: qualified, color: 'bg-green-500' },
    { name: 'Conversion Rate', value: `${conversionRate}%`, color: 'bg-purple-500' },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full ${stat.color}`}></div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="text-lg font-medium text-gray-900">{stat.value}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
