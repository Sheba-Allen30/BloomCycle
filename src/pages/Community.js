import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import "./Community.css";

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // New Post Form
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tag, setTag] = useState("General");
    const [submitting, setSubmitting] = useState(false);

    // Replies
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [replying, setReplying] = useState(false);

    const tags = ["Support", "Advice", "PCOS", "General", "Success Story"];

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await API.get("/community");
            setPosts(res.data);
        } catch (error) {
            console.error("Failed to load posts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            toast.warning("Title and content are required.");
            return;
        }

        try {
            setSubmitting(true);
            const res = await API.post("/community", { title, content, tag });
            setPosts([res.data, ...posts]);
            setTitle("");
            setContent("");
            setTag("General");
            toast.success("Post created successfully!");
        } catch (error) {
            console.error("Failed to create post", error);
            toast.error("Failed to post message.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleLike = async (postId) => {
        try {
            await API.put(`/community/${postId}/like`);
            setPosts(prev => prev.map(p =>
                p._id === postId ? { ...p, likes: p.likes + 1 } : p
            ));
        } catch (error) {
            console.error("Failed to like post", error);
        }
    };

    const handleReplySubmit = async (postId) => {
        if (!replyText.trim()) return;
        try {
            setReplying(true);
            const res = await API.post(`/community/${postId}/reply`, { text: replyText });
            setPosts(prev => prev.map(p => p._id === postId ? res.data : p));
            setReplyText("");
        } catch (error) {
            console.error("Failed to submit reply", error);
            toast.error("Failed to post reply.");
        } finally {
            setReplying(false);
        }
    };

    const toggleReplies = (postId) => {
        if (expandedPostId === postId) {
            setExpandedPostId(null);
        } else {
            setExpandedPostId(postId);
            setReplyText("");
        }
    };

    return (
        <div className="community-container animate-fade-in">
            <div className="community-header animate-slide-up delay-100">
                <h1 className="community-title">Community Forum</h1>
                <p className="community-subtitle">A safe space to share, ask, and support each other.</p>
            </div>

            <div className="community-layout">
                <div className="community-main">

                    <div className="new-post-card animate-slide-up delay-200 hover-lift">
                        <h3>Start a Discussion</h3>
                        <form onSubmit={handleSubmit} className="new-post-form">
                            <input
                                type="text"
                                placeholder="Post Title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="community-input"
                            />
                            <textarea
                                placeholder="What's on your mind?"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows="4"
                                required
                                className="community-textarea"
                            />
                            <div className="new-post-footer">
                                <select
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                    className="community-select"
                                >
                                    {tags.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={submitting}
                                >
                                    {submitting ? "Posting..." : "Post Message"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="posts-feed">
                        {loading ? (
                            <p>Loading discussions...</p>
                        ) : posts.length === 0 ? (
                            <div className="empty-state">
                                <p>No posts yet. Be the first to start a conversation!</p>
                            </div>
                        ) : (
                            posts.map(post => (
                                <div key={post._id} className="post-card hover-lift animate-fade-in delay-100">
                                    <div className="post-header">
                                        <div className="post-author-info">
                                            <div className="author-avatar">{post.author?.name ? post.author.name.charAt(0).toUpperCase() : "?"}</div>
                                            <div>
                                                <span className="author-name">{post.author?.name || "Anonymous"}</span>
                                                <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <span className={`post-tag tag-${post.tag.toLowerCase().replace(" ", "-")}`}>{post.tag}</span>
                                    </div>
                                    <h4 className="post-title">{post.title}</h4>
                                    <p className="post-content">{post.content}</p>

                                    <div className="post-footer">
                                        <button
                                            className="like-btn"
                                            onClick={() => handleLike(post._id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={post.likes > 0 ? "var(--primary)" : "none"} stroke={post.likes > 0 ? "var(--primary)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                            </svg>
                                            <span style={{marginLeft: "6px"}}>{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}</span>
                                        </button>
                                        <button className="reply-btn" onClick={() => toggleReplies(post._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                            <span style={{marginLeft: "6px"}}>{post.replies?.length || 0} Replies</span>
                                        </button>
                                    </div>
                                    
                                    {expandedPostId === post._id && (
                                        <div className="replies-section animate-slide-up delay-100">
                                            <div className="replies-list">
                                                {post.replies && post.replies.length > 0 ? (
                                                    post.replies.map(reply => (
                                                        <div key={reply._id} className="reply-item">
                                                            <div className="reply-avatar">
                                                                {reply.user?.name ? reply.user.name.charAt(0).toUpperCase() : "?"}
                                                            </div>
                                                            <div className="reply-content-box">
                                                                <span className="reply-author">{reply.user?.name || "Anonymous"}</span>
                                                                <p className="reply-text">{reply.text}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="no-replies">No replies yet. Be the first!</p>
                                                )}
                                            </div>
                                            <div className="reply-input-wrapper">
                                                <input 
                                                    type="text" 
                                                    placeholder="Write a supportive reply..." 
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    disabled={replying}
                                                />
                                                <button 
                                                    onClick={() => handleReplySubmit(post._id)}
                                                    disabled={!replyText.trim() || replying}
                                                    className="reply-submit-btn"
                                                >
                                                    {replying ? "..." : "Send"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                </div>

                <div className="community-sidebar">
                    <div className="sidebar-card animate-slide-up delay-300 hover-lift">
                        <h3>Community Rules</h3>
                        <ul className="rules-list">
                            <li>1. Be kind and respectful.</li>
                            <li>2. No medical advice—consult a doctor.</li>
                            <li>3. Keep discussions relevant to cycle health.</li>
                            <li>4. Report abusive content.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
