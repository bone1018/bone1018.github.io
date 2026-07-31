// ===== 文章資料存取 (儲存在瀏覽器 localStorage,不需要後端) =====
const STORAGE_KEY = 'bone1018_articles';

function getArticles() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('讀取文章失敗', e);
        return [];
    }
}

function saveArticles(articles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

function getArticleById(id) {
    return getArticles().find(a => a.id === id);
}

function upsertArticle(article) {
    const articles = getArticles();
    const index = articles.findIndex(a => a.id === article.id);
    if (index >= 0) {
        articles[index] = article;
    } else {
        articles.unshift(article);
    }
    saveArticles(articles);
}

function deleteArticle(id) {
    const articles = getArticles().filter(a => a.id !== id);
    saveArticles(articles);
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
