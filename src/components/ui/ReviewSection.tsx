"use client";

import { useState } from "react";
import { Star, Check, Loader2 } from "lucide-react";

interface ReviewSectionProps {
  categoryId?: string;
  categoryName?: string;
  initialReviews?: {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    gorakhpurArea: string;
    createdAt: string | Date;
  }[];
}

export function ReviewSection({
  categoryId,
  categoryName,
  initialReviews = [],
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [customerName, setCustomerName] = useState("");
  const [gorakhpurArea, setGorakhpurArea] = useState("Golghar");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!comment.trim() || comment.trim().length < 5) {
      setErrorMessage("Please write your feedback (min 5 characters).");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          gorakhpurArea: gorakhpurArea.trim(),
          rating,
          comment: comment.trim(),
          categoryId: categoryId || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit review.");
      }

      setSuccessMessage("Thank you! Your review has been submitted.");
      setReviews([
        {
          id: data.reviewId || String(Date.now()),
          customerName: customerName.trim(),
          rating,
          comment: comment.trim(),
          gorakhpurArea: gorakhpurArea.trim(),
          createdAt: new Date().toISOString(),
        },
        ...reviews,
      ]);

      setCustomerName("");
      setComment("");
      setRating(5);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit review. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-8 shadow-subtle">
      {/* Title */}
      <div className="border-b border-zinc-100 pb-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block mb-1">
            Verified Feedback
          </span>
          <h3 className="text-xl font-bold tracking-tight text-zinc-950">
            Customer Reviews {categoryName ? `for ${categoryName}` : ""}
          </h3>
        </div>
        <div className="text-xs font-mono text-zinc-500">
          Showing {reviews.length} local reviews
        </div>
      </div>

      {/* Review Submission Form */}
      <form onSubmit={handleSubmit} className="bg-zinc-50 p-5 rounded-xl border border-zinc-200 space-y-4">
        <h4 className="text-sm font-bold text-zinc-950">
          Share Your Service Experience
        </h4>

        {successMessage && (
          <div className="p-3 rounded-lg bg-zinc-900 text-white text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-lg bg-zinc-200 text-zinc-900 text-xs">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Vikas Gupta"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950"
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Gorakhpur Area *
            </label>
            <input
              type="text"
              placeholder="e.g. Taramandal"
              value={gorakhpurArea}
              onChange={(e) => setGorakhpurArea(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950"
            />
          </div>

          {/* Star Rating Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Rating *
            </label>
            <div className="flex items-center gap-1 h-9">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-zinc-400 hover:text-zinc-950 transition"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= rating
                        ? "text-zinc-950 fill-zinc-950"
                        : "text-zinc-300"
                    }`}
                  />
                </button>
              ))}
              <span className="font-mono text-xs text-zinc-600 pl-1">
                {rating}/5
              </span>
            </div>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1">
            Your Review / Feedback *
          </label>
          <textarea
            rows={2}
            placeholder="Tell us about the technician's punctuality, repair quality, and pricing..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-zinc-950 text-white font-medium text-xs hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-1.5"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit Review</span>
          )}
        </button>
      </form>

      {/* Review List */}
      <div className="space-y-4 pt-2">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-950">
                    {rev.customerName}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    ({rev.gorakhpurArea})
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-zinc-950 fill-zinc-950"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-xs text-zinc-400 text-center py-4">
            No reviews yet. Be the first to share your experience!
          </p>
        )}
      </div>
    </div>
  );
}
