// Load posts from localStorage or initialize with default posts
let posts = JSON.parse(localStorage.getItem('posts')) || [
    {
        id: 1,
        title: "My First Blog Post",
        content: "This is the content of my first blog post. I'm excited to start blogging!"
    },
    {
        id: 2,
        title: "Another Day, Another Post",
        content: "Here's some more content for my blog. I'm getting the hang of this!"
    }
];

// Password for post creation
const ADMIN_PASSWORD = "secret123";

// Function to save posts to localStorage
function savePostsToLocalStorage() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to load posts on the homepage
function loadPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = ''; // Clear any existing content

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts available.</p>';
    } else {
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
}

// Function to load a single post on the post page
function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const post = posts.find(p => p.id == postId);

    if (post) {
        document.getElementById('post-title').innerText = post.title;
        document.getElementById('post-content').innerText = post.content;
    } else {
        document.getElementById('post-title').innerText = 'Post Not Found';
        document.getElementById('post-content').innerText = '';
    }
}

// Function to handle post creation
function createPost(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const password = document.getElementById('password').value;

    if (password === ADMIN_PASSWORD) {
        const newPost = {
            id: posts.length + 1,
            title: title,
            content: content
        };
        posts.push(newPost);
        savePostsToLocalStorage(); // Save posts to localStorage
        alert("Post created successfully!");
        window.location.href = 'index.html'; // Redirect to home page
    } else {
        alert("Incorrect password. Please try again.");
    }
}

// Initialize the correct function based on the current page
if (document.getElementById('posts')) {
    loadPosts();
} else if (document.getElementById('post-title')) {
    loadPost();
} else if (document.getElementById('postForm')) {
    document.getElementById('postForm').addEventListener('submit', createPost);
}

