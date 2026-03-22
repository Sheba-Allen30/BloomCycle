import React from 'react';
import './Articles.css';

const Articles = () => {
    const articles = [
        {
            category: "Menstrual Cycle",
            title: "Understanding the 4 Phases of Your Cycle",
            description: "Learn what happens to your hormones and energy during Menstruation, Follicular, Ovulatory, and Luteal phases.",
            image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "5 min",
            link: "https://www.healthline.com/health/womens-health/stages-of-menstrual-cycle"
        },
        {
            category: "Symptoms",
            title: "Why Do We Get Cramps?",
            description: "An overview of prostaglandins, why they cause cramping, and natural ways to soothe the pain.",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "4 min",
            link: "https://www.medicalnewstoday.com/articles/157333"
        },
        {
            category: "Wellness",
            title: "Cycle-Syncing Your Diet",
            description: "A complete guide on what to eat during each phase of your cycle to reduce PMS symptoms and boost energy.",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "7 min",
            link: "https://www.healthline.com/nutrition/what-to-eat-during-your-period"
        },
        {
            category: "Mental Health",
            title: "PMDD vs. PMS: What's the Difference?",
            description: "Understand the key differences between standard premenstrual syndrome and premenstrual dysphoric disorder.",
            image: "https://images.unsplash.com/photo-1520699918507-3c3e05c46b0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "6 min",
            link: "https://www.hopkinsmedicine.org/health/conditions-and-diseases/premenstrual-dysphoric-disorder-pmdd"
        },
        {
            category: "Fitness",
            title: "How to Exercise for Your Cycle",
            description: "From heavy lifting to restorative yoga: how to align your workouts with your hormonal shifts.",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "5 min",
            link: "https://www.healthline.com/health/fitness/working-out-on-period"
        },
        {
            category: "Sleep",
            title: "The Link Between Progesterone and Sleep",
            description: "Why you might feel exhausted right before your period and how to get better rest during the luteal phase.",
            image: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "4 min",
            link: "https://www.sleepfoundation.org/women-sleep/pms-and-sleep"
        }
    ];

    return (
        <div className="articles-page container">
            <header className="articles-header">
                <h1>Learn & Explore</h1>
                <p>Curated insights to help you understand your body and cycle.</p>
            </header>

            <div className="articles-grid">
                {articles.map((article, idx) => (
                    <article key={idx} className="article-card card hover-lift animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                        <div className="article-image-container">
                            <img src={article.image} alt={article.title} className="article-image" />
                        </div>
                        <div className="article-content">
                            <span className="article-category">{article.category}</span>
                            <h3 className="article-title">{article.title}</h3>
                            <p className="article-body">{article.description}</p>
                            <div className="article-footer">
                                <span className="read-time">⏳ {article.readTime} read</span>
                                <button className="read-btn" onClick={() => window.open(article.link, '_blank', 'noopener,noreferrer')}>Read Article</button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Articles;
