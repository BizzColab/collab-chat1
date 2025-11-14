import React from "react";
import { useChannelStateContext } from "stream-chat-react";
import useAuthUser from "../hooks/useAuthUser";

const StatusDot = ({ status }) => {
  const styles = {
    display: "inline-block",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    marginRight: "8px",
    verticalAlign: "middle",
  };

  if (status === "online") styles.background = "#16a34a"; // green
  else if (status === "typing") styles.background = "#f59e0b"; // amber
  else styles.background = "#9ca3af"; // gray for offline

  return <span style={styles} />;
};

const TypingIndicator = () => {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="animate-bounce" style={{ animationDelay: "0ms", animationDuration: "1s" }}>
        .
      </span>
      <span className="animate-bounce" style={{ animationDelay: "150ms", animationDuration: "1s" }}>
        .
      </span>
      <span className="animate-bounce" style={{ animationDelay: "300ms", animationDuration: "1s" }}>
        .
      </span>
    </span>
  );
};

const formatLastSeen = (lastActiveDate) => {
  if (!lastActiveDate) return null;

  const now = new Date();
  const lastActive = new Date(lastActiveDate);
  const diffMs = now - lastActive;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return lastActive.toLocaleDateString();
};

const ChatHeader = ({ title }) => {
  const { channel } = useChannelStateContext();
  const { authUser } = useAuthUser();

  // Determine other member
  const members = channel?.state?.members || {};
  const memberIds = Object.keys(members).filter((id) => id !== authUser?._id && id !== authUser?.id);
  const otherMemberId = memberIds.length ? memberIds[0] : null;
  const otherMember = otherMemberId ? members[otherMemberId] : null;

  // Online status from Stream user object
  const isOnline = otherMember?.user?.online;

  // Typing status: channel.state.typing is an object with userId keys
  const typing = channel?.state?.typing || {};
  const isTyping = otherMemberId ? Boolean(typing[otherMemberId]) : false;

  // Last active timestamp
  const lastActive = otherMember?.user?.last_active;
  const lastSeenText = !isOnline && lastActive ? formatLastSeen(lastActive) : null;

  const status = isTyping ? "typing" : isOnline ? "online" : "offline";

  const displayName = otherMember?.user?.name || title || "Chat";

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-base-300 bg-base-200">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 rounded-full overflow-hidden bg-base-300 ring-2 ring-offset-1 ring-offset-base-200" style={{
            ringColor: status === "online" ? "#16a34a" : status === "typing" ? "#f59e0b" : "#9ca3af"
          }}>
            <img
              src={otherMember?.user?.image || ""}
              alt={displayName}
              onError={(e) => (e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")}
            />
          </div>
        </div>
        <div>
          <div className="font-semibold text-base">{displayName}</div>
          <div className="text-sm text-base-content/70 flex items-center">
            <StatusDot status={status} />
            {status === "typing" ? (
              <span className="flex items-center">
                Typing
                <TypingIndicator />
              </span>
            ) : status === "online" ? (
              <span>Online</span>
            ) : (
              <span>{lastSeenText || "Offline"}</span>
            )}
          </div>
        </div>
      </div>
      <div>{/* placeholder for actions */}</div>
    </div>
  );
};

export default ChatHeader;
