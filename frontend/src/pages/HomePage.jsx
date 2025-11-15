import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    getOutgoingFriendReqs,
    getRecommendedUsers,
    getUserFriends,
    sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon, Sparkles, MessageCircle } from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
    const queryClient = useQueryClient();
    const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

    const { data: friends = [], isLoading: loadingFriends } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    });

    const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
        queryKey: ["users"],
        queryFn: getRecommendedUsers,
    });

    const { data: outgoingFriendReqs } = useQuery({
        queryKey: ["outgoingFriendReqs"],
        queryFn: getOutgoingFriendReqs,
    });

    const { mutate: sendRequestMutation, isPending } = useMutation({
        mutationFn: sendFriendRequest,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
    });

    useEffect(() => {
        const outgoingIds = new Set();
        if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
            outgoingFriendReqs.forEach((req) => {
                outgoingIds.add(req.recipient._id);
            });
            setOutgoingRequestsIds(outgoingIds);
        }
    }, [outgoingFriendReqs]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto space-y-10">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  ">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                            Chats
                        </h2>

                    </div>
                    <Link
                        to="/notifications"
                        className="btn btn-primary btn-sm gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        <UsersIcon className="size-4" />
                        Friend Requests
                    </Link>
                </div>

                {/* Friends Section */}
                {loadingFriends ? (
                    <div className="flex justify-center py-16">
                        <div className="relative">
                            <span className="loading loading-spinner loading-lg text-primary" />
                            <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse"></div>
                        </div>
                    </div>
                ) : friends.length === 0 ? (
                    <NoFriendsFound />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {friends.map((friend) => (
                            <FriendCard key={friend._id} friend={friend} />
                        ))}
                    </div>
                )}

                {/* Recommended Users Section */}
                <section className="mt-12">
                    <div className="mb-8 backdrop-blur-sm bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
                                    <Sparkles className="size-6 text-primary-content" />
                                </div>
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                        Recommendations
                                    </h2>
                                    <p className="text-base-content/70 text-sm mt-1">
                                        Discover new friendsb to chat
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {loadingUsers ? (
                        <div className="flex justify-center py-16">
                            <div className="relative">
                                <span className="loading loading-spinner loading-lg text-secondary" />
                                <div className="absolute inset-0 blur-xl bg-secondary/20 animate-pulse"></div>
                            </div>
                        </div>
                    ) : recommendedUsers.length === 0 ? (
                        <div className="card bg-gradient-to-br from-base-200 to-base-300 p-8 text-center shadow-xl border border-base-300/50">
                            <div className="max-w-md mx-auto">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UsersIcon className="size-8 text-primary" />
                                </div>
                                <h3 className="font-semibold text-xl mb-2">No recommendations available</h3>
                                <p className="text-base-content/70">
                                    Check back later for new partners!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendedUsers.map((user) => {
                                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                                return (
                                    <div
                                        key={user._id}
                                        className="group relative card bg-gradient-to-br from-base-100 to-base-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-base-300/50"
                                    >
                                        {/* Animated gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="card-body p-6 space-y-4 relative z-10">
                                            {/* Header with avatar and info */}
                                            <div className="flex items-start gap-4">
                                                <div className="relative">
                                                    <div className="avatar">
                                                        <div className="w-16 h-16 rounded-2xl overflow-hidden">
                                                            <img src={user.profilePic} alt={user.fullName} className="object-cover w-full h-full" />
                                                        </div>
                                                    </div>
                                                    {/* Online indicator */}
                                                    <div className="absolute -bottom-1 -right-1 flex">
                                                        <span className="relative flex h-4 w-4">
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
                                                        {user.fullName}
                                                    </h3>
                                                    {user.location && (
                                                        <div className="flex items-center text-xs text-base-content/70 mt-1 gap-1">
                                                            <MapPinIcon className="size-3 flex-shrink-0" />
                                                            <span className="truncate">{user.location}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Languages with enhanced badges */}
                                            <div className="flex flex-wrap gap-2">
                                                <div className="badge badge-lg bg-gradient-to-r from-primary to-secondary text-primary-content border-0 shadow-md gap-1.5 px-3 py-3">
                                                    <span className="text-base">{getLanguageFlag(user.nativeLanguage)}</span>
                                                    <span className="font-medium">Native: {capitialize(user.nativeLanguage)}</span>
                                                </div>
                                                <div className="badge badge-lg badge-outline border-2 gap-1.5 px-3 py-3 hover:bg-base-300 transition-colors">
                                                    <span className="text-base">{getLanguageFlag(user.learningLanguage)}</span>
                                                    <span className="font-medium">Learning: {capitialize(user.learningLanguage)}</span>
                                                </div>
                                            </div>

                                            {/* Bio section */}
                                            {user.bio && (
                                                <div className="bg-base-200/50 rounded-xl p-3 border border-base-300/30">
                                                    <p className="text-sm text-base-content/80 line-clamp-2">
                                                        {user.bio}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Action button */}
                                            <button
                                                className={`btn w-full mt-2 gap-2 shadow-lg transition-all duration-300 ${hasRequestBeenSent
                                                        ? "btn-success btn-disabled"
                                                        : "btn-primary hover:scale-[1.02] hover:shadow-xl"
                                                    }`}
                                                onClick={() => sendRequestMutation(user._id)}
                                                disabled={hasRequestBeenSent || isPending}
                                            >
                                                {hasRequestBeenSent ? (
                                                    <>
                                                        <CheckCircleIcon className="size-5" />
                                                        <span className="font-semibold">Request Sent</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlusIcon className="size-5" />
                                                        <span className="font-semibold">Send Friend Request</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {/* Decorative corner accent */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default HomePage;