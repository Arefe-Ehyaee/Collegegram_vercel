
export interface NotifBadgeprops {
    notifCounts?: number
  };

export default function NotifBadge({notifCounts} :NotifBadgeprops ) {

  return (
    <span className="rounded-full min-w-5 h-6 bg-orange text-white text-sm py-1 px-2 text-center align-middle justify-center items-center">
{notifCounts}
  </span>
  );
}
