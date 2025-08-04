export default function CommunicationCard({ type, date, time, content }) {
  const typeStyles = {
    Call: { bg: "bg-blue-500", text: "text-blue-800", border: "border-blue-500" },
    Email: { bg: "bg-red-500", text: "text-red-800", border: "border-red-500" },
    WhatsApp: { bg: "bg-green-500", text: "text-green-800", border: "border-green-500" },
    SMS: { bg: "bg-orange-500", text: "text-orange-800", border: "border-orange-500" },
  };

  const { bg = "bg-gray-500", text = "text-gray-800", border = "border-gray-500" } = typeStyles[type] || {};

  return (
    <div className={`min-w-[300px] max-w-[300px] flex-shrink-0 rounded-xl  shadow-sm overflow-hidden bg-white`}>
      {/* Header: Date and Time */}
      <div className={`${bg} text-white px-4 py-2 flex justify-between items-center`}>
        <span className="text-sm font-medium">{date}</span>
        <span className="text-sm font-semibold">{time}</span>
      </div>

      {/* Scrollable Content */}
      <div className="max-h-[240px] overflow-y-auto px-4 py-2 text-sm space-y-2">
        {content.map((item, idx) => (
          <div key={idx} className={item.small ? "text-xs text-gray-500" : "text-sm"}>
            <div className="font-semibold">{item.label}</div>
            <div className="break-words">
              {typeof item.value === "string" ? <p>{item.value}</p> : item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
