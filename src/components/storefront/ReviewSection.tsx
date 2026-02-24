import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Review } from "@/lib/types";
import { toast } from "sonner";

interface ReviewSectionProps {
  rating: number;
  totalReviews: number;
  reviews: Review[];
}

const ReviewSection = ({ rating, totalReviews, reviews }: ReviewSectionProps) => {
  const [activeTab, setActiveTab] = useState("all");

  const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: totalReviews > 0 ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100 : 0
  }));

  // Since mock data only has a few reviews, we simulate the breakdown for better UI
  const simulatedBreakdown = [
    { stars: 5, percentage: 75, count: Math.round(totalReviews * 0.75) },
    { stars: 4, percentage: 15, count: Math.round(totalReviews * 0.15) },
    { stars: 3, percentage: 5, count: Math.round(totalReviews * 0.05) },
    { stars: 2, percentage: 3, count: Math.round(totalReviews * 0.03) },
    { stars: 1, percentage: 2, count: Math.round(totalReviews * 0.02) },
  ];

  const handleUnderConstruction = () => {
    toast.info("This feature is coming soon!");
  };

  return (
    <div className="mt-16 pt-16 border-t">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="h-6 w-6 text-accent fill-accent" /> Customer Reviews
          </h2>

          <div className="bg-card border rounded-2xl p-8 mb-6">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-foreground mb-2">{rating.toFixed(1)}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-5 w-5 ${s <= rating ? "text-accent fill-accent" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Based on {totalReviews.toLocaleString()} reviews</p>
            </div>

            <div className="space-y-3">
              {simulatedBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-3 font-medium">{item.stars}</span>
                  <Star className="h-3 w-3 text-accent fill-accent" />
                  <Progress value={item.percentage} className="h-2 flex-1" />
                  <span className="w-10 text-right text-muted-foreground">{item.percentage}%</span>
                </div>
              ))}
            </div>

            <Button
              onClick={handleUnderConstruction}
              className="w-full mt-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
            >
              Write a Review
            </Button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-4">
              {["All", "Most Recent", "Highest Rated"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${activeTab === tab.toLowerCase()
                      ? "border-accent text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {reviews && reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="pb-8 border-b last:border-none"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3 items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-accent/10 text-accent font-bold">
                          {review.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-foreground">{review.userName}</h4>
                        <div className="flex gap-1 mt-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`h-3 w-3 ${s <= review.rating ? "text-accent fill-accent" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {review.comment}
                  </p>
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors">
                      <ThumbsUp className="h-3.5 w-3.5" /> Helpful (0)
                    </button>
                    <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors">
                      <MessageSquare className="h-3.5 w-3.5" /> Reply
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-secondary/10 rounded-2xl border border-dashed">
                <MessageSquare className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground italic">No detailed reviews available yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
