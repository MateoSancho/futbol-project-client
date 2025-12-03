import { useEffect, useState } from "react";
import commentsService from "../services/comments.services";

function CommentSection({ playerId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");
  const loggedUserId = token ? JSON.parse(atob(token.split(".")[1]))._id : null;

  // Fetch comments on mount
  useEffect(() => {
    commentsService
      .getComments(playerId)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Error loading comments:", err))
      .finally(() => setLoading(false));
  }, [playerId]);

  // Submit new comment
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    commentsService
      .createComment(playerId, newComment)
      .then((res) => {
        setComments([...comments, res.data]);
        setNewComment("");
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
      <h3>Comments</h3>

      {/* New Comment Form */}
      {token && (
        <form onSubmit={handleSubmitComment} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows="3"
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
              <strong>{comment.userId?.username || "Unknown User"}</strong>
              <p>{comment.text}</p>

              {/* Delete button only for comment owner */}
              {comment.userId?._id === loggedUserId && (
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;

