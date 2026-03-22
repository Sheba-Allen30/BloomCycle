const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name")
            .populate("replies.user", "name")
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content, tag } = req.body;
        const post = await Post.create({
            author: req.user.id,
            title,
            content,
            tag
        });
        const populatedPost = await Post.findById(post._id).populate("author", "name");
        res.status(201).json(populatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.likes += 1;
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.replyPost = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Reply text is required" });

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.replies.push({
            user: req.user.id,
            text
        });

        await post.save();
        
        // Return fully populated post
        const updatedPost = await Post.findById(post._id)
            .populate("author", "name")
            .populate("replies.user", "name");
            
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
