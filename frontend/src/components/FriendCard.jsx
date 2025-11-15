import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MessageCircle, Sparkles } from "lucide-react";

const FriendCard = ({ friend }) => {
  return (
    <div className="group card bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.97] transition-all duration-500 border border-primary/20 overflow-hidden relative cursor-pointer backdrop-blur-sm rounded-3xl">
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/15 to-accent/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Click flash effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40 opacity-0 group-active:opacity-100 transition-opacity duration-200"></div>
      
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
      
      <div className="card-body p-5 relative z-10 space-y-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3">
          <div className="relative group/avatar">
            <div className="avatar">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-500">
                <img 
                  src={friend.profilePic} 
                  alt={friend.fullName}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            {/* Sparkle effect on hover */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Sparkles className="size-3 text-primary animate-pulse" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base truncate group-hover:text-primary transition-colors duration-300">
              {friend.fullName}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
              <p className="text-xs text-success font-medium">Online</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

        {/* Language badges */}
        <div className="flex-row gap-2 flex ">
          <span className="badge badge-md bg-gradient-to-r from-primary to-secondary text-primary-content border-0 shadow-md gap-1.5 font-medium">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-md badge-outline border-border-accent/100 gap-1.5 font-medium hover:bg-accent/10 transition-colors">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        {/* Message button */}
        <Link 
          to={`/chat/${friend._id}`} 
          className="btn btn-primary btn-sm w-full gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn overflow-hidden relative"
        >
          {/* Button shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          
          <MessageCircle className="size-4 relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
          <span className="font-semibold relative z-10">Message</span>
        </Link>
      </div>

      {/* Decorative corner gradient */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
      
      {/* Bottom glow effect */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-4 w-5 object-cover rounded shadow-sm"
      />
    );
  }
  return null;
}