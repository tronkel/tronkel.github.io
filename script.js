// Example blog posts
const posts = [
    {
        id: 1,
        title: "Cats",
        content: "Both cats are fine and dandy!"
    },
    {
        id: 2,
        title: "Jack and Eva",
        content: "Usual ackes and pains!"
    }
];

// Function to load posts on the homepage
function loadPosts() {
    const postsContainer = document.getElementById('posts');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content.substring(0, 100)}...</p>
            <a href="post.html?id=${post.id}">Read More</a>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Function to load a single post on the post page
function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const post = posts.find(p => p.id == postId);

    if (post) {
        document.getElementById('post-title').innerText = post.title;
        document.getElementById('post-content').innerText = post.content;
    }
}

// Call the appropriate function based on the page
if (document.getElementById('posts')) {
    loadPosts();
} else if (document.getElementById('post-title')) {
    loadPost();
}

