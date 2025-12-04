import { useEffect, useState } from "react";
import commentsService from "../services/comments.services";

function CommentSection({ playerId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  let loggedUserId = null;
  let userRole = null;

  const token = localStorage.getItem("authToken");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      loggedUserId = payload._id;
      userRole = payload.role; // Get role from token
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }

  // Fetch comments
  useEffect(() => {
    loadComments();
  }, [playerId]);

  const loadComments = () => {
    setLoading(true);
    commentsService
      .getComments(playerId)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.error("Error loading comments:", err))
      .finally(() => setLoading(false));
  };

  // Submit new comment
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    commentsService
      .createComment(playerId, newComment)
      .then((res) => {
        setNewComment("");
        loadComments(); // Refresh to get populated data
      })
      .catch((err) => console.error("Error posting comment:", err));
  };

  // Delete comment
  const handleDeleteComment = (commentId) => {
    commentsService
      .deleteComment(commentId)
      .then(() => {
        setComments(comments.filter((c) => c._id !== commentId));
      })
      .catch((err) => console.error("Error deleting comment:", err));
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>

      {/* New Comment Form for only logged users */}
      {token && (
        <form onSubmit={handleSubmitComment} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows="3"
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      )}

      {/* Comments List */}
      <div className="comment-list">
        {comments.length === 0 ? (
          <p>No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                <div className="comment-author">
                  {/* Use comment.author not comment.userId */}
                  <strong>{comment.author?.username || "Unknown"}</strong>
                  <span className="comment-date">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>

                {/* Show delete for comment owner OR admin */}
                {(comment.author?._id === loggedUserId ||
                  userRole === "admin") && (
                  <button
                    className="comment-delete-btn"
                    onClick={() => handleDeleteComment(comment._id)}
                    title="Delete comment"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="comment-text">
                <p>{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
